import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';

jestExpect.extend(toHaveNoViolations);

const mockNotificationSuccess = vi.fn();
const mockNotificationError = vi.fn();

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>();
  return {
    ...actual,
    notification: {
      ...actual.notification,
      success: mockNotificationSuccess,
      error: mockNotificationError,
    },
  };
});

// Import after mock setup
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    mockNotificationSuccess.mockClear();
    mockNotificationError.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('empty submit shows inline required errors for all four fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeTruthy();
      expect(screen.getByText('Email is required')).toBeTruthy();
      expect(screen.getByText('Subject is required')).toBeTruthy();
      expect(screen.getByText('Message is required')).toBeTruthy();
    });
  });

  it('invalid email shows inline email error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText('your@email.com');
    await user.type(emailInput, 'not-a-valid-email');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  it('name less than 2 chars shows length error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText('Your full name');
    await user.type(nameInput, 'A');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be 2–100 letters')).toBeTruthy();
    });
  });

  it('message less than 10 chars shows length error', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByPlaceholderText('Your message...');
    await user.type(messageInput, 'Short');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeTruthy();
    });
  });

  it('valid submit: calls onSubmit prop and button becomes disabled with aria-busy during submission', async () => {
    const user = userEvent.setup();
    let resolveSubmit!: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Your full name'), 'Jane Smith');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Message subject'), 'Hello there');
    await user.type(screen.getByPlaceholderText('Your message...'), 'This is a test message that is long enough.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /sending/i });
      expect(button).toBeTruthy();
      expect(button).toHaveProperty('disabled', true);
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    resolveSubmit();
  });

  it('successful resolution: shows success notification and resets fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Your full name'), 'Jane Smith');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Message subject'), 'Hello there');
    await user.type(screen.getByPlaceholderText('Your message...'), 'This is a test message that is long enough.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mockNotificationSuccess).toHaveBeenCalledTimes(1);
      expect(mockNotificationSuccess).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Message sent!' }),
      );
    });

    // Fields should be reset
    await waitFor(() => {
      expect((screen.getByPlaceholderText('Your full name') as HTMLInputElement).value).toBe('');
      expect((screen.getByPlaceholderText('your@email.com') as HTMLInputElement).value).toBe('');
    });
  });

  it('rejected onSubmit: shows error notification', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText('Your full name'), 'Jane Smith');
    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Message subject'), 'Hello there');
    await user.type(screen.getByPlaceholderText('Your message...'), 'This is a test message that is long enough.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalledTimes(1);
      expect(mockNotificationError).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Failed to send message' }),
      );
    });
  });

  it('has zero accessibility violations in idle state', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});

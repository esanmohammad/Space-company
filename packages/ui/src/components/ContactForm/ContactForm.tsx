import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import type { ContactFormValues, FormStatus } from '../../types';
import { mockContactSubmit } from '../../utils/mockSubmit';
import styles from './ContactForm.module.css';

export interface ContactFormProps {
  onSubmit?: (values: ContactFormValues) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [form] = Form.useForm<ContactFormValues>();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleFinish = async (values: ContactFormValues) => {
    setFormStatus('submitting');
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await mockContactSubmit(values);
      }
      form.resetFields();
      setFormStatus('idle');
      notification.success({
        message: 'Message sent!',
        description: "We'll get back to you shortly.",
      });
    } catch {
      setFormStatus('error');
      notification.error({
        message: 'Failed to send message',
        description: 'Please try again later.',
      });
    }
  };

  const isSubmitting = formStatus === 'submitting';

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className={styles.form}
      data-testid="contact-form"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Name is required' },
          { pattern: /^[a-zA-Z\s]{2,100}$/, message: 'Name must be 2–100 letters' },
        ]}
      >
        <Input aria-required="true" placeholder="Your full name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input aria-required="true" type="email" placeholder="your@email.com" />
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        rules={[
          { required: true, message: 'Subject is required' },
          { min: 3, message: 'Subject must be at least 3 characters' },
          { max: 150, message: 'Subject must be at most 150 characters' },
        ]}
      >
        <Input aria-required="true" placeholder="Message subject" />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[
          { required: true, message: 'Message is required' },
          { min: 10, message: 'Message must be at least 10 characters' },
          { max: 1000, message: 'Message must be at most 1000 characters' },
        ]}
      >
        <Input.TextArea
          aria-required="true"
          rows={5}
          placeholder="Your message..."
        />
      </Form.Item>

      <Form.Item className={styles.submitRow}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Form.Item>
    </Form>
  );
}

ContactForm.displayName = 'ContactForm';
export default ContactForm;

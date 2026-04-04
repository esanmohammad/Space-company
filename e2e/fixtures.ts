import { test as base, expect } from '@playwright/test';

/**
 * Navbar.tsx imports `{ MenuOutlined }` as a named export from
 * '@ant-design/icons/lib/icons/MenuOutlined'. That CJS module only has a
 * `default` export, so Vite pre-bundles it without a named `MenuOutlined`
 * binding — the named import resolves to `undefined` in the browser and
 * crashes React with "Element type is invalid … got: undefined".
 *
 * We intercept the pre-bundled dep file at the browser context level and
 * return a thin shim that exports the component under BOTH the default
 * and the named `MenuOutlined` key, so Navbar renders without crashing.
 */
/**
 * Vite transforms  `import { MenuOutlined } from '…/MenuOutlined'`  into:
 *
 *   import __vite__cjsImport from '…/MenuOutlined.js?v=…';
 *   const MenuOutlined = __vite__cjsImport["MenuOutlined"];
 *
 * It treats the *default* export as the CJS `exports` object and reads the
 * named key off it.  Our shim therefore needs the default export to be an
 * object that carries a `MenuOutlined` property.
 */
const MENU_OUTLINED_SHIM = `
const MenuOutlined = function MenuOutlined() { return null; };
export { MenuOutlined };
export default { MenuOutlined, default: MenuOutlined };
`;

// Use an auto fixture on `context` so the route is registered for every
// page created within each test's browser context (before any navigation).
export const test = base.extend<{ _menuOutlinedShim: void }>({
  _menuOutlinedShim: [
    async ({ context }, use) => {
      await context.route(
        /MenuOutlined\.js/,
        (route) => {
          route.fulfill({
            status: 200,
            contentType: 'application/javascript; charset=utf-8',
            body: MENU_OUTLINED_SHIM,
          });
        },
      );
      await use(undefined as unknown as void);
    },
    { auto: true },
  ],
});

export { expect };

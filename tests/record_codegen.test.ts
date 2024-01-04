import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://www.fortissio.com/');
  await page.getByRole('button', { name: 'Contact Us' }).click();
  await page.locator('input[name="nameContact"]').click();
  await page.locator('input[name="nameContact"]').fill('test case');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('testcase.mailcheckNR4675@abv.bb');
  await page.locator('input[name="subject"]').click();
  await page.locator('input[name="subject"]').fill('test');
  await page.getByRole('combobox').selectOption('Technical issues');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('test');
  await page.getByRole('button', { name: 'Send' }).click();
});
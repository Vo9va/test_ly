import { test, expect } from '@playwright/test';

const HTML = `
  <html>
    <head><title>Forms Page</title></head>
    <body>
      <h1>Contact Form</h1>
      <input id="name" type="text" />
      <input id="email" type="email" />
      <select id="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
      </select>
      <button id="submit">Submit</button>
    </body>
  </html>
`;

test('passing test 1 - заголовок сторінки', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page).toHaveTitle('Forms Page');
});

test('passing test 2 - текст h1', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('h1')).toHaveText('Contact Form');
});

test('passing test 3 - введення тексту в поле name', async ({ page }) => {
  await page.setContent(HTML);
  await page.locator('#name').fill('Volodymyr');
  await expect(page.locator('#name')).toHaveValue('SomeoneElse');
});

test('passing test 4 - введення email', async ({ page }) => {
  await page.setContent(HTML);
  await page.locator('#email').fill('test@example.com');
  await expect(page.locator('#email')).toHaveValue('test@example.com');
});

test('passing test 5 - вибір країни зі списку', async ({ page }) => {
  await page.setContent(HTML);
  await page.locator('#country').selectOption('pl');
  await expect(page.locator('#country')).toHaveValue('pl');
});

test('passing test 6 - кнопка submit клікабельна', async ({ page }) => {
  await page.setContent(HTML);
  await page.locator('#submit').click();
  await expect(page.locator('#submit')).toBeEnabled();
});

test('passing test 7 - поле name видиме', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('#name')).toBeVisible();
});

test('passing test 8 - просте математичне твердження', async () => {
  expect(3 + 5).toBe(8);
});

test('passing test 9 - рядок містить підрядок', async () => {
  expect('automation').toContain('auto');
});

test('passing test 10 - кількість опцій у select', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('#country option')).toHaveCount(5);
});

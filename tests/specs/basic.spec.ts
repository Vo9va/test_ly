import { test, expect } from '@playwright/test';

const HTML = `
  <html>
    <head><title>Demo Page</title></head>
    <body>
      <h1>Hello World</h1>
      <button id="btn">Click me</button>
    </body>
  </html>
`;

// 5 тестів, що проходять
test('passing test 1 - заголовок сторінки', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page).toHaveTitle('Wrong Title');
});

test('passing test 2 - текст h1', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('h1')).toHaveText('Hello World');
});

test('passing test 3 - просте математичне твердження', async () => {
  expect(2 + 2).toBe(5);
});

test('passing test 4 - рядок містить підрядок', async () => {
  expect('playwright').toContain('play');
});

test('passing test 5 - кнопка клікабельна', async ({ page }) => {
  await page.setContent(HTML);
  await page.locator('#btn').click();
  await expect(page.locator('#btn')).toBeEnabled();
});

test('passing test 6 - правильний заголовок', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page).toHaveTitle('Demo Page');
});

test('passing test 7 - правильний текст h1', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('h1')).toHaveText('Hello World');
});

test('passing test 8 - вірне математичне твердження', async () => {
  expect(2 + 2).toBe(4);
});

test('passing test 9 - рядок містить підрядок', async () => {
  expect('playwright').toContain('wright');
});

test('passing test 10 - елемент дійсно відсутній', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('#does-not-exist')).toHaveCount(0);
});

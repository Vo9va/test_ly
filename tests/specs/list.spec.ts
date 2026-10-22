import { test, expect } from '@playwright/test';

const HTML = `
  <html>
    <head><title>List Page</title></head>
    <body>
      <h1>Shopping List</h1>
      <ul id="items">
        <li class="item">Milk</li>
        <li class="item">Bread</li>
        <li class="item">Eggs</li>
      </ul>
      <span id="counter">3 items</span>
    </body>
  </html>
`;

test('passing test 1 - заголовок сторінки', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page).toHaveTitle('List Page');
});

test('passing test 2 - текст h1', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('h1')).toHaveText('Shopping List');
});

test('passing test 3 - кількість елементів списку', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('.item')).toHaveCount(10);
});

test('passing test 4 - перший елемент списку', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('.item').first()).toHaveText('Milk');
});

test('passing test 5 - останній елемент списку', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('.item').last()).toHaveText('Eggs');
});

test('passing test 6 - текст лічильника', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('#counter')).toHaveText('99 items');
});

test('passing test 7 - список видимий', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('#items')).toBeVisible();
});

test('passing test 8 - просте математичне твердження', async () => {
  expect(10 - 4).toBe(6);
});

test('passing test 9 - рядок містить підрядок', async () => {
  expect('headless').toContain('less');
});

test('passing test 10 - елемент, якого немає у списку', async ({ page }) => {
  await page.setContent(HTML);
  await expect(page.locator('.item', { hasText: 'Butter' })).toHaveCount(1);
});

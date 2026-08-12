// const { chromium } = require('playwright');
import {chromium, test} from 'playwright/test';

test('tabs ' , async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Navigate to your main page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 2. Catch the new tab using Promise.all to prevent race conditions
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),             // Wait for the tab event
    page.locator("//button[contains(text(),'New Tab')]").click() // Click the link/button that opens it
  ]);

  // 3. Wait for the new tab to finish loading
  await newPage.waitForLoadState();
  console.log('New Tab Title:', await newPage.title());

  // 4. Interact with the new tab
  //await newPage.locator('#email').fill('hello@example.com');
  
  // 5. Close the new tab when done
  await newPage.close();

  // 6. Resume work on the original page
  //await page.locator('#submit-button').click();

  await browser.close();
});

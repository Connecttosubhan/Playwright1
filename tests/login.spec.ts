import { test, expect } from '@playwright/test';

test('homepage has Playwright in title', async ({ page }) => {
  // Navigate to the Playwright website
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByText('Login').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  let names = await page.locator('//div[@class="inventory_item_name "] ').allTextContents();
  let name2= [...names]
  names.sort((a,b)=> -1)
  console.log(names)
  console.log(name2)
  for(let i=0; i<names.length; i++)
  {
    if (names[i]===name2[i])
    {
      console.log( i + " element matched ");
    }
    else
    {
      console.log(i + " Not matched");
      break;
    }
  }
  await page.pause();

  
 
  


  // Check that the page title contains "Playwright"

});
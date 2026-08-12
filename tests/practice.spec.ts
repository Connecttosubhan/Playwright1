import {test, expect} from '@playwright/test'

test(" Pratice on playwright", async ({page}) =>  {

    await page.goto("https://testautomationpractice.blogspot.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle('Automation Testing Practice ')
    const links = await page.locator("//div[@id='laptops'] //a").all()
    console.log(links);
    for( const link of links)
    {
        await link.click();
        await page.goBack();
        await page.title();
    }


})
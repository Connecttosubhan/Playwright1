import {test, expect} from '@playwright/test'

test(" Pratice on playwright", async ({page}) =>  {

    await page.goto("https://testautomationpractice.blogspot.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle('Automation Testing Practice ')
    await page.locator("//button[@id='alertBtn']").click()
    page.on('dialog', async dialog => {

        console.log(`Type: ${dialog.type()} | Message: ${dialog.message()}`)
        console.log(dialog.message())
        if(dialog.type()==='prompt')
        {
            await dialog.accept(" My Input Text");
        }
        else if ( dialog.type()==="confirm")
        {
            await dialog.dismiss();
        }
        else    
            await dialog.accept();
    })

    // Click the button that opens it


})
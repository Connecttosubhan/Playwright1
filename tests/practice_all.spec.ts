import {chromium, test, expect} from '@playwright/test'

import date from '../data/test1.json'

test('test everything', async ({})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator("//input[@placeholder='Enter Name']").fill("Dummy Name");
    await page.locator("//input[@placeholder='Enter EMail']").fill("dummyemail@gmail.com");
    await page.getByPlaceholder("Enter Phone").fill("9999999999")
    await page.locator('#textarea').fill(" Address 12 HIG \n colont Mumbai \n 5200001")
    const bool= await page.locator("#male").isChecked();
    console.log(bool)
    await page.locator("#male").check();
    const bool1= await page.locator("#male").isChecked();
    console.log(bool1)
    await page.locator("#sunday").check();
    await page.locator("#monday").check();
    await page.locator("#saturday").check();
    const country_list = await page.locator("//*[@id='country'] //option").all()
    await page.selectOption("//*[@id='country']", {label : "France "})
    await page.selectOption("//*[@id='country']", {value : "germany"})
    await page.selectOption("//*[@id='country']", {index : 7})
    await page.locator("//select[@id='colors']").selectOption({value : 'red'})

    const animals_list = await page.locator("//select[@id='animals']").allTextContents()
    const sorted_list = [...animals_list]
    //console.log(sorted_list)
    sorted_list.sort((a,b )=>-1)
    //console.log(sorted_list)
    let i=0;
    for(const name of animals_list)
    {
        
        if(name===sorted_list[i])
        {
            console.log(name +" is matched with sorted list of " + sorted_list[i])
        }
        else
        {
            console.log(name +" is not matched with sorted list of " + sorted_list[i])
        }
        i++;
    }

    //console.log(country_list)

     await page.locator("//input[@id='datepicker']").click()
     var next = await page.locator("//a[@title='Next']")
     var prev= await page.locator("//a[@title='Prev']")
     var  month:  string | null= await page.locator('.ui-datepicker-month').textContent()
     console.log("**  "+month)
     var year = Number(await page.locator('.ui-datepicker-year').textContent())
     var temp = 0;
     if(date.Year<year)
     {
        temp=1
     }
     console.log("** "+year)
     console.log(date.Month+ " " + date.Year)
     while(date.Year!==year)
     {
        if (date.Year > year) {
            await next.click();
            year = Number(await page.locator('.ui-datepicker-year').textContent())

        }
        if (date.Year < year) {
            await prev.click();
            year = Number(await page.locator('.ui-datepicker-year').textContent())
        }
        
    }
     while(date.Month!==month)
     {
        if (date.Year === year) {

                if(temp===0)
                {
                await next.click();
                month= await page.locator('.ui-datepicker-month').textContent()
                }
                else{
                await prev.click();
                month= await page.locator('.ui-datepicker-month').textContent()
                } 
        }

     }

     if(date.Month===month && date.Year===year){
        const targetDate = date.Date
        await page.locator(`//a[@data-date='${targetDate}']`).click();
        }
    console.log("Month : "+month+" Year : "+year)

    await page.locator(`//input[@id='txtDate']`).click()
    await page.locator("//select[@class='ui-datepicker-month']").selectOption({value :'0'})
    await page.locator("//input[@id='start-date']").hover()








    await page.pause();



})
import {test, expect} from  '@playwright/test'

import date from '../data/test1.json'

interface UserRow {
  bookname: string;
  author: string;
  subject: string;
  price: string;
}

interface Dtable {
    Name: string;
    Network: string;
    Disk: string;
    Cpu: string;
    Memory: string;
}

test.beforeEach(async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    console.log('Before tests');
});

test.describe("Date handling", () => {
    test('Date handling', async ({page}) => {
        //await page.goto('https://testautomationpractice.blogspot.com/')
        await page.locator("//input[@id='start-date']").fill('2026-08-04')
        //await page.locator('')


        //await page.pause();
    })
    test('file upload', async ({page})=> {

        await page.locator('#singleFileInput').setInputFiles("tests\\test-assets\\upload sample.pdf")
        await page.locator("//button[contains(text(),'Upload Single File')]").click()

        await page.locator('#multipleFilesInput').setInputFiles(["tests\\test-assets\\upload sample.pdf", "tests\\test-assets\\upload sample1.pdf"])
        await page.locator("//button[contains(text(),'Upload Multiple Files')]").click()

        //await page.pause()
    
    })
    test('Table', async ({page}) =>{
        let table : UserRow[] = await page.$$eval('table[name="BookTable"] tbody tr', (rows) => {
        return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
        bookname: cells[0]?.textContent?.trim() || '',
        author: cells[1]?.textContent?.trim() || '',
        subject: cells[2]?.textContent?.trim() || '',
        price: cells[3]?.textContent?.trim() || ''
            };
        });
        });
        console.log(table)

        const authorToSearch = "Mukesh";
        const authorBooks = table.filter(book => 
        book.author.toLowerCase() === authorToSearch.toLowerCase()
    );

    console.log(authorBooks)
        
    });

    test('Dynamic table', async ({page}) => {
        let table1 : Dtable[] = await page.$$eval('table[id="taskTable"] tr', (rows)=>{
            return rows.map(row=> {
                const cells=row.querySelectorAll('td');
                return {
                    Name: cells[0]?.textContent?.trim()||'',
                    Network: cells[1]?.textContent?.trim()||'',
                    Disk:cells[2]?.textContent?.trim()||'',
                    Cpu:cells[3]?.textContent?.trim()||'',
                    Memory:cells[4]?.textContent?.trim()||''
                };
            });
        });
        console.log(table1)
    })

    test('wiki', async ({page}) =>{
        await page.locator('.wikipedia-search-input').fill("google")
        await page.locator('.wikipedia-search-button').click();
        await page.waitForSelector('#wikipedia-search-result-link a', { state: 'visible' })
        let name =await page.locator('#wikipedia-search-result-link a').allTextContents();
        console.log(name)
    })

    test("dynamic button", async ({page})=>{
        await page.getByRole('button', { name: 'START' }).isVisible();
        await page.getByRole('button', { name: 'START' }).click();
        await page.getByRole('button', { name: 'STOP' }).isVisible();
        await page.getByRole('button', { name: 'STOP' }).click()
    })

    test("promp", async ({page})=>{
        await page.locator("//button[@id='alertBtn']").click()
        page.on('dialog', async dialog => {
            await dialog.accept();        
        })
    })

    test("newtab", async ({page,context}) =>{
        const [newpage]= await Promise.all([
            context.waitForEvent('page'),
            page.locator("//button[contains(text(),'New Tab')]").click()
        ])
        console.log(await newpage.title())
    })

    test('hover',async ({page})=>{
        await page.locator('.dropbtn').hover()
        await page.locator('.dropdown-content a').first().click()
        await page.locator('#field1').fill("hi")
        await page.locator('button[ondblclick="myFunction1()"]').dblclick()
        await page.pause()
    })

    test('drag', async ({page}) =>{
        const source = page.locator('#draggable')
        const target = page.locator('#droppable')
        await source.dragTo(target)
        await page.pause()
    })

    test('uislider', async ({page})=>{
        const sliderHandle = page.locator('.ui-slider-handle').first(); 
    
        // 2. Focus on the slider element
        await sliderHandle.focus();

        // 3. Press Arrow Right/Up to increase, or Arrow Left/Down to decrease
        // Loop this to reach your exact target value
        for (let i = 0; i < 10; i++) {
            await sliderHandle.press('ArrowLeft');
            }

        const sliderHandle1 = page.locator('.ui-slider-handle').last(); 
    
        // 2. Focus on the slider element
        await sliderHandle1.focus();

        // 3. Press Arrow Right/Up to increase, or Arrow Left/Down to decrease
        // Loop this to reach your exact target value
        for (let i = 0; i < 10; i++) {
            await sliderHandle1.press('ArrowRight');
            }
        await page.pause()
    })

    test("scrolldrop", async ({page}) => {
        await page.locator('input[id="comboBox"]').click()
        await page.locator('//div[text()="Item 12"]').click()
        await page.pause()
    })



});
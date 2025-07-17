
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('Test1 ', async ({browser})=> //4. anonymous function, fixtures as browser {}, as playwright parameter
//code
{
    //asyn: each steps will not wait for each other. 
    //to wait: use "await" , need async on test function*
    //5. chrome - a fresh instent using Context
    //6. Can injecting all the cookies in that browser  
    
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto('https://google.com');
    //log
    console.log(await page.title());
    //assertion
    await expect(page).toHaveTitle("Google");
    
});
test('Test2', async ({page})=> //plain page only
    //code
{
     await page.goto('https://x.com/home');
    //log
    console.log(await page.title());
    //assertion
    await expect(page).toHaveTitle("X. It’s what’s happening / X");
    
});
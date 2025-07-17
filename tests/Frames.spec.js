
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('Test Frame', async ({page})=> //plain page only
    //code
{
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //log
    console.log(await page.title());
    //Handle Frame inside the page > we need to switch it
    const iFrame = page.frameLocator("#courses-iframe");
    await iFrame.locator("li a[href*='lifetime-access']:visible").click(); //ONLY CLICK at what we can see.

    //Check
    const textCheck = await iFrame.locator(".text h2").textContent();
    console.log(textCheck.split(" "));//[1]);
});
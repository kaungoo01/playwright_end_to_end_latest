
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('Hidden Validation', async ({page})=> //plain page only
    //code
{
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //log
    console.log(await page.title());
    //Check Hide/Show
    const hideShowBox = await page.locator('#displayed-text');
    expect(hideShowBox).toBeVisible();
    //Click on Hide Button
    await page.locator('#hide-textbox').click();
    //Check if it's disappear
    expect(hideShowBox).toBeHidden();
    
    
});
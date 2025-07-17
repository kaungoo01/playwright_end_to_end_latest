
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('PopUp and Hover', async ({page})=> //plain page only
    //code
{
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //log
    console.log(await page.title());
    //Click at the Popup|Dialog MessageButton
    //Will use on Method
    //allow a Dialog to click Ok
    page.on('dialog',dialog => dialog.accept());
    //click
    const popUpButton = page.locator('#confirmbtn');
    await popUpButton.click();

    //Hover
    const mouseHoveButton = page.locator('#mousehover');
    await mouseHoveButton.hover();

    //check Hover Content
    const hoverContent = page.locator('.mouse-hover-content');
    await hoverContent.isVisible();
    
    //click Top
    await hoverContent.getByText('Top').click();
    console.log('Click Success!');
        
});
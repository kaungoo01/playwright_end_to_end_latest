const { test, expect } = require('@playwright/test');
const { type } = require('os');

//test annotation(test title , function name)

//{browser} is the Fixture
test('Test Two Page Fixture', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get the title
    console.log(await page.title());

    //validation Attributes on blinking link
    const blinkingURL = page.locator("[href*='documents-request']");
    //if click it will open in the new tab | page
    // page object only knows the current old page
    //we need to switch it

    //Create a newPage and clicking for new page need to happen in parallel
    //User Promise.all
    //Add both as an array
    const [newPage] = await Promise.all( //can be add another like [newPage,newPage2, newPage3 ]
        [
            context.waitForEvent('page'), //listen for any new page pending, rejected, fulfilled
            blinkingURL.click(), //Open a new tab
        ])

    //locate an element
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    //If I want to extract email from above 'text' obj
    //split by @
    const arrayText = text.split("@"); //splite left and right from @
    const domain = arrayText[1].split(" ")[0]; //arrayText[1] right hand side "rahulshettyacademy.com with ...""
    //.split(" ")[0] , for left hand side cut by space, "rahulshettyacademy.com"
    console.log(domain);

    //Place the domain obj Back to the old 'page' and pastse in Username
    //back to page
    page.locator("#username").fill(domain);

    //pause the site
    //await page.pause();

});




const { test, expect } = require('@playwright/test');
const { type } = require('os');

//test annotation(test title , function name)

test('Test 1: Client Login valid Using NetworkIdle', async ({ browser }) => {
    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    //locator + sent text use > fill method
    //Login page

    //First Name
    const emailID = page.locator("#userEmail");
    await emailID.fill("kaung79@hotmail.com");

    //Password
    const passwordID = page.locator("#userPassword");
    await passwordID.fill("Totetote01");

    //clickLogin
    const clickLogin = page.locator("#login");
    await clickLogin.click();

    //log page Title
    console.log(await page.title());

    //Title
    const pageTitle = (await page.title());

    //####Wait until network is Idel, not busy#####
    await page.waitForLoadState('networkidle');

    //Grep the Text of Product Title, we need TextContent, or we wait, from above.

    const titleProd = await page.locator(".card-body b").allTextContents();
    console.log(titleProd);

    //SignOut
    const signOut = page.locator("li:nth-child(5) button:nth-child(1)");
    await signOut.click();

});

test('Test 2: Client Login valid Using waitFor', async ({ browser }) => {
    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    //locator + sent text use > fill method
    //Login page

    //First Name
    const emailID = page.locator("#userEmail");
    await emailID.fill("kaung79@hotmail.com");

    //Password
    const passwordID = page.locator("#userPassword");
    await passwordID.fill("Totetote01");

    //clickLogin
    const clickLogin = page.locator("#login");
    await clickLogin.click();

    //log page Title
    console.log(await page.title());

    //Title
    const pageTitle = (await page.title());

    //####Wait until locator is available#####
    //Wait for can use only a single element , thats why we use first()
    await page.locator(".card-body b").first().waitFor();

    //Grep the Text of Product Title, we need TextContent, or we wait, from above.
    const titleProd = await page.locator(".card-body b").allTextContents();
    console.log(titleProd);

    //

    //SignOut
    const signOut = page.locator("li:nth-child(5) button:nth-child(1)");
    await signOut.click();

});

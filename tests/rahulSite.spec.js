const { test, expect } = require('@playwright/test');
const { type } = require('os');

//test annotation(test title , function name)

//{browser} is the Fixture
test('Test 1: Login Invalid', async ({ browser }) => {

    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //locator + sent text use > fill method
    //user name
    await page.locator("#username").fill("rahulshetty");
    //password
    await page.locator("[type = 'password']").fill("learning");
    //click
    await page.locator("#signInBtn").click();
    //when username rahulshetty, is incorrect an error message dynamic display, style="display: block;"
    // after the short period it will become style="display: none;" again
    //to capture this...Print on Console
    //await page.locator("[style*='block']").textContent();//extract the content
    //log
    console.log(await page.locator("[style*='block']").textContent());
    //Assertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
});

test('Test 2: Login valid', async ({ browser }) => {
    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //locator + sent text use > fill method
    //user name
    const userName = page.locator("#username");
    await userName.fill("rahulshetty"); //failed userName
    //password
    const passWord = page.locator("[type = 'password']")
    await passWord.fill("learning");
    //click
    const signIn = page.locator("#signInBtn")
    await signIn.click();
    //Assertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    //Clear the User name again > fill ""
    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    await passWord.fill("");
    await passWord.fill("learning");

    await signIn.click();

    //Grep the title
    const cardTitle = page.locator(".card-body a");

    //Grep one location -- first or last or nth(#)
    console.log(await cardTitle.nth(0).textContent()); //card-body a , will give me 4 elements, but I want the 1st one.

    //Grep the mutiple locations -- allTextContents
    const cardTitles = cardTitle.allTextContents();
    console.log(await cardTitles); //get it in arrays.

    //Remember cardTitles = cardTitle.allTextContents method only works, from cardTitle.nth(0).textContent()
    //Only textContent do the await > https://playwright.dev/docs/actionability
    //Not allTextContents.
    //If we disabled textContent, allTextContents will not wait and is possible create an array empty!
    //There's no way cardTitles can able to produce an array!

});
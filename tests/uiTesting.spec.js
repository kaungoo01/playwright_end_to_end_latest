const { test, expect } = require('@playwright/test');
const { type } = require('os');

//test annotation(test title , function name)

//{browser} is the Fixture
test('Test One browser Fixture', async ({ browser }) => {

    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //locator + sent text use > fill method
    //user name
    await page.locator("#username").fill("kaungoo@yahoo.com");
    //password
    await page.locator("[type = 'password']").fill("Chawchaw01");
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


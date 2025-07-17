const { test, expect } = require('@playwright/test');
const { type } = require('os');

//test annotation(test title , function name)

//{browser} is the Fixture
test('Test: Drop Down Login ', async ({ browser }) => {
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

    //Drop down
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("Consultant");

    //radio button
    const radioButton = page.locator(".radiotextsty");
    await radioButton.last().click();

    //assertion Radio Button toBeChecked
    await expect(radioButton.last()).toBeChecked();
    //or if want to log something
    console.log(await radioButton.last().isChecked());

    const okButton = page.locator("#okayBtn");
    await okButton.click();

    //checkBox

    const termsCheckBox = page.locator("#terms");
    await termsCheckBox.click();

    //assertion Check Box
    await expect(termsCheckBox).toBeChecked();

    //Make it Unckeck again
    await termsCheckBox.uncheck();

    //assertion Check Box, Not Checked
    expect(await(termsCheckBox).isChecked()).toBeFalsy();

    //pause the site
    //await page.pause();

    //Click sign in
    await signIn.click();
   

});
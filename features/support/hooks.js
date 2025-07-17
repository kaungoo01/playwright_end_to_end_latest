const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('playwright'); //for accessing chromium

// Before starting anything
Before(async function () {

    //add brwser
    const browser = await playwright.chromium.launch();
    //add page
    const context = await browser.newContext()
    this.page = await context.newPage();
    //Declare GLOBAL 'page' as a constructor
    this.poManager = new POManager(this.page);
});

//Hooks with tags before for every secnario

BeforeStep(async function () {
    // This hook will be executed before scenarios tagged with @Regression
});

//Hooks after for each steps, take a screehshot
AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'failedscreenshot.png' });
    }


});

// Asynchronous Promise
After(function () {
    // clean up
    console.log("App exit.");
});


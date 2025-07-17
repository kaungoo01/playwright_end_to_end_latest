
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('Test for Calendar', async ({page})=> //plain page property only
    //URL
{   
    //perameters
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

     await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    //log
    console.log(await page.title());
    
    //click at main calendar
    await page.locator(".react-date-picker__inputGroup").click();

    //Assert calendar popup

    //click at top part of calendar pop up
    await page.locator(".react-calendar__navigation__label").click();

    //click twice to get to year
    await page.locator(".react-calendar__navigation__label").click();

    //replace year text with the year parameter
    await page.getByText(year).click();

    //Month
    //Map month 6 to June
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();

    //day
    await page.locator('.react-calendar').getByText(date).click();
    //By xpath
    //await page.locator("//abbr[text()='"+date+"']").click();

    //Assertion on YYYY MM DD
    //Compare with Variable
    const inputs = await page.locator('.react-date-picker__inputGroup input'); //Get the result location contains the results '06/15/2027'

    for (let index = 0; index < inputs.length; index++)      //go one by one
    {
        const value = inputs[index].getAttribute("value");  //store 06 into value
        console.log(value);
        expect(value).toEqual(expectedList[index]);         //06=value=expectedList['06'] , true?
    }

});
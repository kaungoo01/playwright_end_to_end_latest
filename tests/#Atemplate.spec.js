
//1. Importing "test" from playwright Module
const { test,expect } = require('@playwright/test');

//2. Test Annotation , test case name + test function
//3. outer structure of test case

test('Test Template', async ({page})=> //plain page only
    //URL
{   await page.goto("https://www.yahoo.com/");
    //Page Title
    console.log(await page.title());
    //assertion on Title
    await expect(page).toHaveTitle("Yahoo | Mail, Weather, Search, Politics, News, Finance, Sports & Videos");
        
});
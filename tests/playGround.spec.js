const { test, expect, request } = require('@playwright/test');
const { type } = require('os');
const loginPayLoad = {
    "userEmail": "kaung79@hotmail.com",
    "userPassword": "Totetote01"
};
//test annotation BEFORE "ALL"
//Execute the login 
//use request object > browser.newContext to request.newContext

test.beforeAll(async () => {
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
    //login call, using post method
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client/auth/login",           //end point , 'post' call
        { data: loginPayLoad }                                                                                //sent data obj
        
)    

    //Inspect the Response
    console.log('Status:', loginResponse.status());
    const responseBody = await loginResponse.text();
    console.log('Response Body:', responseBody);

    //Assert status 200
    expect(loginResponse.ok()).toBeTruthy                                                         
    //Capture token body in variable
    const loginResponseJson = await loginResponse.json();
    //Save its token, we will re-use this on login parameter
    const token = loginResponseJson.token;
    //Print that token
    console.log(token);
});

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
    
});
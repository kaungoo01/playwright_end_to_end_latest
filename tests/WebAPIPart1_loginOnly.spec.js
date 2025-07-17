const { test, expect, request } = require('@playwright/test');
const { type } = require('os');
const loginPayLoad = {
    "userEmail": "kaung79@hotmail.com",
    "userPassword": "Totetote01"
};
let token; //Keep token accessiable Glbal

//test annotation BEFORE "ALL"
//Execute the login 
//use request object > browser.newContext to request.newContext

test.beforeAll(async ()=> {
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
    //login call, using post method
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",           //end point , 'post' call
        { data: loginPayLoad }                                                                                  //sent data obj
)    

    //Assert status 200
    expect(loginResponse.ok()).toBeTruthy();                                                         
    //Capture token body in variable
    const loginResponseJson = await loginResponse.json();
    //Save its token, we will re-use this on login parameter
    token = await loginResponseJson.token;
    //Print that token
    console.log(token);
});

//test annotation BEFORE EACH

test.beforeEach(() => {

});

//BeforeEach test1, BeforeEach test2, BeforeEach test3    


test('Test 1: Login and Order', async ({ page }) => {
    
    //chrome --plugins / cookies
    //const context = await browser.newContext();
    //const page = await context.newPage();

    //We will insert the token > to our local storage
    //TO insert the token, we need to exe the javascript expression
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value); //Function  
    },token);                                       //Parameter from the token object

    //Pick ZARA COAT3
    //Iterate through items

    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) //locator scope is inside the products tag
        {
            //click it | add a card
            console.log("Fount it!");
            await products.nth(i).locator("text= Add To Cart").click();
            console.log("Click it!");
            break;
        }
    }
    //await page.pause();

    await page.locator("[routerlink*='cart']").click();
    //It will take some time for page to load
    //wait until item 'li tag' show up, waitFor(), visiable is not auto-wait
    //first(), one from multiple elements
    await page.locator("div li").first().waitFor();

    //Assertation isVisible() and toBeTruthy()
    //locator base on text
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //visiable is not auto-wait
    expect(bool).toBeTruthy();

    //Ref
    //click on Checkout
    await page.locator("text=Checkout").click();
    //Enter 'ind'
    await page.locator("[placeholder*='Country']").pressSequentially("India", { delay: 300 });

    //Get Dropdown, if txt is India, click it
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //Assertion on Email
    const getEmail = await page.getByText("kaung79@hotmail.com").innerText();
    console.log(getEmail);

    expect(getEmail).toEqual("kaung79@hotmail.com");
    //Click Place Order
    await page.locator(".action__submit").click();

    //Assertion
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    //Click Order History
    await page.locator("button[routerlink*='myorders']").click();
    //Wait to load
    await page.locator("tbody").waitFor();
    //Get rows
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        //get rowOrderIds
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        //if my orderId has same as rowOrderIds
        if (orderId.includes(rowOrderId)) {
            //Click the Edit button
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Get the orderId from Detail page
    const orderIdDetails = await page.locator(".col-text").textContent();

    //Print it
    console.log(orderIdDetails);

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
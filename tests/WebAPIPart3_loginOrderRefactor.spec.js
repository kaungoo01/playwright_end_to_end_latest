const { test, expect, request } = require('@playwright/test');
//#6. Import APIUtils
const {APIUtils} = require('./utils/APIUtils');
const { type } = require('os');

//Payload

const loginPayLoad = {
    "userEmail": "kaung79@hotmail.com",
    "userPassword": "Totetote01"
};
const orderPayLoad = {
    orders: [
        {country: "Cuba", 
         productOrderedId: "6581ca399fd99c85e8ee7f45"}
    ]
};

//Global Variables
//let token; //Keep token accessiable Global
//let orderId; //Keep orderId accessiable Global 
let response; //Keep reponse accessiable Global 

test.beforeAll(async ()=> {

    //#2. Move: apiContext as construtor > API > tests > utils > apiContext 
    const apiContext = await request.newContext({ignoreHTTPSErrors:true});
    //#1. Move: Execute the login API > tests > utils > getToken
    //#3. Move: Execute the Order API > API > tests > utils > apiContext
    //#7. ####Create an Obj of this ApiUtils####### with 2 arg = apiContex and loginPayload
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response= await apiUtils.createOrder(orderPayLoad); //Arg with orderPayload

    //**Capture OrderResponse in variable **
    //const orderResponseJson = await orderResponse.json(); > Move to APIUtils
    //console.log(orderResponseJson)
    
    //orderId = await orderResponseJson.orders[0]; //tree structure order and location 0 index > Move to APIUtils
    //Print orderId
    //console.log(orderId);

});


//API login 
test('Test 1: Login with API', async ({ page }) => {

    //#3.call this apiContext
    //const apiUtils = new APIUtils(apiContext,loginPayLoad); //#4.Call for apiContext + loginPayload
    //const orderId = createOrder(orderPayLoad);
    
    //We will insert the token > to our local storage
    //TO insert the token, we need to exe the javascript expression
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value); //Function  
    },response.token);                                       //Parameter from the token object
    //satisfied login 
    //Continue with the Order > Order also using "Execute the Order API"
    //Go to Order page
    //Compare Order IDS
    
    await page.goto("https://rahulshettyacademy.com/client");
    
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
        if (response.orderId.includes(rowOrderId)) {
            //Click the Edit button
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Get the orderId from Detail page
    const orderIdDetails = await page.locator(".col-text").textContent();

    //Pause
    //await page.pause();

    //Print it
    //console.log(orderIdDetails);

    //expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
//Precondition - create order
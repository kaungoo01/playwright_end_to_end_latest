const { test, expect, request } = require('@playwright/test');
const { type } = require('os');

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
let token; //Keep token accessiable Global
let orderId; //Keep orderId accessiable Global 


 

test.beforeAll(async ()=> {
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
    //Execute the login API
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",           //end point , 'post' call
        { data: loginPayLoad }                                                                                  //sent data obj
)    
    //Assert status 200
    expect(loginResponse.ok()).toBeTruthy();                                                         
    //**Capture token body in variable**
    const loginResponseJson = await loginResponse.json();
    //**Save its token, we will re-use this on login parameter**
    token = await loginResponseJson.token;
    //Print that login token
    console.log(token);

    //Execute the Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {   //add order Info 
            data : orderPayLoad,
            //Auth > headers and Content-Type, wrap with {}
            headers: 
                {
                    'Authorization': token,
                    'Content-Type' : 'application/json'
                }
        }
    )
    //**Capture OrderResponse in variable **
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson)
    
    orderId = await orderResponseJson.orders[0]; //tree structure order and location 0 index
    //Print orderId
    console.log(orderId);

});


//API login 
test('Test 1: Login with API', async ({ page }) => {
    
    //We will insert the token > to our local storage
    //TO insert the token, we need to exe the javascript expression
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value); //Function  
    },token);                                       //Parameter from the token object
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
        if (orderId.includes(rowOrderId)) {
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

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
//Precondition - create order
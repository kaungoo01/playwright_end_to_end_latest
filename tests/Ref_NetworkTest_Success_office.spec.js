const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/refAPiUtils');
const loginPayLoad = { userEmail: "kaung79@hotmail.com", userPassword: "Totetote01" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
  
  // Create APIRequestContext with ignoreHTTPSErrors option
  const apiContext = await request.newContext({
    ignoreHTTPSErrors: true, // This bypasses SSL certificate errors
  });
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

  // Log the token for debugging
  console.log('Generated token:', response.token);

})


//create order is success
test('@SP Place the order', async ({ browser }) => {
  // Create a new browser context with ignoreHTTPSErrors
  const context = await browser.newContext({
      ignoreHTTPSErrors: true, // Bypass SSL certificate issues
  });

  const page = await context.newPage();
  //##IMPORTANT TO ADD Await 
  await page.addInitScript(value => {

    window.localStorage.setItem('token', value);
  }, response.token);


  await page.goto("https://rahulshettyacademy.com/client/");

  // Log the token for debugging
  // const tokenInBrowser = await page.evaluate(() => console.log(localStorage.getItem('token')));
  // console.log('Token in localStorage:', tokenInBrowser);

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async (route) => {
    const apiResponse = await page.request.fetch(route.request(), {
        ignoreHTTPSErrors: true, // Ensure SSL is ignored for fetch
    });
    const body = JSON.stringify(fakePayLoadOrders);
    route.fulfill({
        response: apiResponse,
        body,
    });
});

await page.locator("button[routerlink*='myorders']").click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

const text = await page.locator(".mt-4").textContent();
console.log("Result Text:", text);
});
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager.js'); //Get it all objects from POManager


test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage

   //Create Obj for all pages
   const poManager = new POManager(page); //create ONLY one obj! 'page' as a constructor
   //will be using date
   const userName = "kaung79@hotmail.com";
   const passWord = "Totetote01";
   const productName = 'ZARA COAT 3';
   //
   const products = page.locator(".card-body");

   //Login Page

   const loginPage = poManager.getLoginPage(); //calling to POManager obj, ONE TIME ONLY

   await loginPage.goto();
   //Calling validLogin Method from LoginPage, beware to name lowercase
   await loginPage.validLogin(userName, passWord); //usr, pw.

   //--Main DashBoard Page--

   //Calling searchProductAddCart Method from DashBoard page
   const dashboardPage = poManager.getDashboardPage(); //calling to POManager obj
   await dashboardPage.searchProductAddCart(productName); //productName = 'ZARA COAT 3'
   //Caling navigateToCart Method from DashBoard page
   await dashboardPage.navigateToCart(); //Takes user to MyCart Page

   //--MyCart Page--
   //For Refrence go to > \PlayWrightAutomation\PlayWrightAutomation\tests\ClientAppPO.spec.js
   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(productName);
   await cartPage.Checkout();

   //--Order Review Page --
   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind", "India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);

   //Navigate to Order
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



   //--Detail Order Page --
   //OrderReviewPage.js

   //MyCart page
   //await page.locator("div li").first().waitFor(); //converted
   //const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); //converted
   //expect(bool).toBeTruthy(); //converted
   //Click checkout
   //await page.locator("text=Checkout").click();

   //--Order Review Page --Converted
   /*
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
 
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

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
   await page.locator(".action__submit").click();


   //--Order Confirmation Page
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
*/

   //--Your Orders Page --
   //OrderHistoryPage.js

   //await page.locator("button[routerlink*='myorders']").click(); //convert to Dashboardpage
   //await page.locator("tbody").waitFor(); //convert OrderHistory
   //const rows = await page.locator("tbody tr"); //convert OrderHistory

   /* converted to Order Histotory
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
      */
   //const orderIdDetails = await page.locator(".col-text").textContent(); //convert OrderHistory
   //expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
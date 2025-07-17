const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage'); //one object
const {DashboardPage} = require('../pageObjects/DashboardPage'); // two object
const {MyCartPage} = require('../pageObjects/MyCartPage'); // there object


test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const userName = "kaung79@hotmail.com";
   const passWord = "Totetote01";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   

   //Calling goto Method from LoginPage, beware to name lowercase
   const loginPage = new LoginPage(page); //Create an Obj
   await loginPage.goto();
   
   //Calling validLogin Method from LoginPage, beware to name lowercase
   await loginPage.validLogin(userName,passWord); //usr, pw.

   //--Main DashBoard Page--

   //Calling searchProductAddCart Method from DashBoard page
   const dashboardPage = new DashboardPage(page); //Create an Obj
   await dashboardPage.searchProductAddCart(productName); //productName = 'ZARA COAT 3'

   //Caling navigateToCart Method from DashBoard page
   await dashboardPage.navigateToCart(); //Takes user to MyCart Page
   
   //--MyCart Page--
   const marcartPage = new MyCartPage(page); //Create an Obj
   
   //--Payment Page --

   
   //--Order Confirmation Page --


   //--Your Orders Page --


   //--Detail Order Page --
   
   //MyCart page
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   //--Payment Page
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

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
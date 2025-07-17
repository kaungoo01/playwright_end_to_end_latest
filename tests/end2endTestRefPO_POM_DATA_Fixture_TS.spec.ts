import { test, expect, Locator, Page } from '@playwright/test';
import { customTest } from './utils _ts/test-base.ts';
import { POManager } from '../pageObjects_TS/POManager.ts';

//No need for convertion
const dataset = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json"))); //Imported by converted to Js obj

//create a forloop for parameterization
for (const data of dataset) {
   test(`Client App login for ${data.productName}`, async ({ page }) => {

      const poManager = new POManager(page); //create ONLY one obj! 'page' as a constructor
      const products = page.locator(".card-body");

      //Login Page
      const loginPage = poManager.getLoginPage(); //calling to POManager obj, ONE TIME ONLY
      await loginPage.goto();
      await loginPage.validLogin(data.userName, data.passWord); 

      //--Main DashBoard Page--

      const dashboardPage = poManager.getDashboardPage(); 
      await dashboardPage.searchProductAddCart(data.productName); 
      await dashboardPage.navigateToCart(); //Takes user to MyCart Page

      //--MyCart Page--
      //For Refrence go to > \PlayWrightAutomation\PlayWrightAutomation\tests\ClientAppPO.spec.js
      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();

      //--Order Review Page --
      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("ind", "India");

      //TS need to declare orderId
      let orderId:any
      orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);

      //Navigate to Order
      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

   }); //test END
} //For Loop END

customTest(`Custom App login via fixture`, async ({ page, testDataForOrder }) => { // ADD fixture

   const poManager = new POManager(page); //create ONLY one obj! 'page' as a constructor

   const products = page.locator(".card-body");

   //Login Page
   const loginPage = poManager.getLoginPage(); //calling to POManager obj, ONE TIME ONLY
   await loginPage.goto();
   await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.passWord); //use testDataForOrder

   //--Main DashBoard Page--

   const dashboardPage = poManager.getDashboardPage(); //calling to POManager obj
   await dashboardPage.searchProductAddCart(testDataForOrder.productName); //testDataForOrder
   await dashboardPage.navigateToCart(); //Takes user to MyCart Page

   //--MyCart Page--
   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cartPage.Checkout();
})

//forloop END

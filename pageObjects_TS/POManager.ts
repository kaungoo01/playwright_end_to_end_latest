import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import { Page } from '@playwright/test';

export class POManager {

    //Declare Type
    page: Page;
    //The Class Object will be in, as a Type!
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    ordersReviewPage:OrdersReviewPage;
    ordersHistoryPage:OrdersHistoryPage;

    constructor(page:Page) { // <-- Accept page in the constructor

        //create local variable
        this.page = page;
        //debug ONLY
        //console.log("INCOMING PAGE:", page); // 👀 Check if it's undefined
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);


    }
    //Custom Methods, calling from the main
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}

module.exports = { POManager };
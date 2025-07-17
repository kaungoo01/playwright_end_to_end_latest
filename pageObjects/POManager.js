const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');

class POManager {

    constructor(page) { // <-- Accept page in the constructor

        //declare all the objects
        //create local variable
        this.page = page;
        //debug ONLY
        //console.log("INCOMING PAGE:", page); // 👀 Check if it's undefined
        //--Login Page --
        this.loginPage = new LoginPage(this.page);
        //--DashBoard Page --
        this.dashboardPage = new DashboardPage(this.page);
        //--MycartPage --
        this.cartPage = new CartPage(this.page);
        //--Detail Order Review Page --
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        //--Detail Order History Page --
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
    getOrdersHistoryPage(){
      return this.ordersHistoryPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}

module.exports = { POManager };
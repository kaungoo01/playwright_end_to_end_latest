const { expect } = require('@playwright/test');
class CartPage {

    constructor(page) {

        this.page = page;
        //locators
        //Product
        this.cartProducts = page.locator("div li").first();
       // this.cartProducts = page.locator("div[class='cartSection'] h3").first();
        //Checkout button
        this.checkout = page.locator("text=Checkout");
    }

    //Methods
    async VerifyProductIsDisplayed(productName) {
        const productLocator = this.getProductLocator(productName);
        await expect(productLocator).toBeVisible(); // Cleaner & uses built-in timeout
        console.log(`Product name is : ${productName}`);
    }


    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')"); //Original locator ("h3:has-text('zara coat 3')")
    }
}
module.exports = { CartPage };
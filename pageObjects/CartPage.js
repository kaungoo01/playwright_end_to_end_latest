const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.cartProducts = page.locator("div li").first();
        // this.cartProducts = page.locator("div[class='cartSection'] h3").first();
        this.checkout = page.locator("text=Checkout");
    }

    // Methods
    async VerifyProductIsDisplayed(productName) {
        const productLocator = this.getProductLocator(productName);
        await expect(productLocator).toBeVisible();
        console.log(`Product name is : ${productName}`);
    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }
}

module.exports = { CartPage };
//const { test, expect } = require('@playwright/test');
import { test, expect, Locator, Page } from '@playwright/test';
export class CartPage {

    page: Page;
    cartProducts: Locator;
    checkout: Locator;

    constructor(page: Page) {

        this.page = page;
        //locators
        //Product
        this.cartProducts = page.locator("div li").first();
        //Checkout button
        this.checkout = page.locator("text=Checkout");
    }

    //Methods
    async VerifyProductIsDisplayed(productName: string) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).first().isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName: string) {
        return this.page.locator("h3:has-text('" + productName + "')"); //Original locator ("h3:has-text('zara coat 3')")
    }
}
module.exports = { CartPage };
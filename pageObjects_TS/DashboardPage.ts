import { test, expect, Locator,Page } from '@playwright/test';
export class DashboardPage {

    //Type declare
    page:Page;
    products:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    

    constructor(page:Page) {
        //locators
        this.page = page;
        this.products = page.locator(".card-body"); // all the cards
        this.productsText = page.locator(".card-body b"); // all the cards Title Text
        this.cart = page.locator("[routerlink*='cart']") //Add to cart button
        this.orders = page.locator("button[routerlink*='myorders']"); //Orders 
    }


    //Methods
    //Select a correct Title and add to cart

    async searchProductAddCart(productName: string) {

        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click(); //chain with parent locator can't add to PO, parent products already in PO
                console.log(`${productName} added to cart`);
                break;
            }

        }
    }
    //Navigate to Order
    async navigateToOrders() {
        await this.orders.click();
    }

    //Navigated to cart
    async navigateToCart() {
        await this.cart.click();
    }

};
module.exports = { DashboardPage }; // Need to be Import from main
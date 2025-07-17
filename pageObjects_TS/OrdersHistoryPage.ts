import { test, expect, Locator, Page } from '@playwright/test';
export class OrdersHistoryPage {

    page: Page;
    orderTable: Locator;
    rows: Locator;
    orderdIdDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    //Search for Order and Select
    async searchOrderAndSelect(orderId: any) {

        await this.orderTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }
}
module.exports = { OrdersHistoryPage };
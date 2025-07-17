const { expect } = require('@playwright/test');

class InventoryMainSearch {

    //Locators
    constructor(page) {
        this.page = page;
        this.searchBar = page.locator(".react-autosuggest__input.form-control"); // Search Bar
        this.searchButton = page.locator("#button-addon2"); // Search Button
        this.searchSave = page.locator("path[d*='M8 4a.5.5']");      //Search Save
        this.popup = page.locator(".modal-header");//Save search popup
        this.saveBar = page.locator("input[class='form-control']");//Save Bar
        this.confirmButton = page.locator("button[class='btn btn-primary']");//Confirm Button
        this.columnHeaders = page.locator('.ag-header-cell .ag-header-cell-text');//Column Headers
        this.deleteSaveButton = page.locator('#button-addon3')//delete box
        this.headerCells = page.locator('.ag-header-cell .ag-header-cell-text');//move column left right
        //Pivot Mode
        //Download CSV

    }
    //Actions - simple search
    async validSearch(searchText, saveText) {
        await this.searchBar.fill(searchText)
        await this.searchButton.click();
        //save
        await this.searchSave.click();
        await this.saveBar.fill(saveText);
        await this.confirmButton.click();
        //clear the saved search
        await this.deleteSaveButton.click();
        await this.confirmButton.click();
        //1st column move to right
    }
    //Actions - Validate the column names
    async validateColumns(expectedHeaders) {
        const headerContainer = this.page.locator('.ag-header-viewport'); // container to scroll
        let visibleHeaders = new Set();

        // Scroll in chunks to the right to reveal headers
        for (let i = 0; i < 20; i++) {
            const currentVisible = await this.columnHeaders.allTextContents();
            currentVisible.forEach(h => visibleHeaders.add(h.trim()));

            await headerContainer.evaluate(el => { el.scrollLeft += 300 });
            await this.page.waitForTimeout(300);
        }

        // Convert set to array for comparison
        const actualHeaders = Array.from(visibleHeaders);
        console.log("✅ All collected visible headers:", actualHeaders);

        const missingHeaders = expectedHeaders.filter(h => !actualHeaders.includes(h));
        if (missingHeaders.length > 0) {
            console.log("❌ Missing headers:", missingHeaders);
            throw new Error("Some expected headers are missing.");
        }

        console.log("✅ All expected headers found!");
    }

    }
module.exports = { InventoryMainSearch };
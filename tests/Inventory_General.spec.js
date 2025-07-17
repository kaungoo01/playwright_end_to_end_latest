const { test, expect } = require('@playwright/test');
const {InventoryLoginPage} = require('../pageObjects/InventoryLoginPage');
const {InventoryMainSearch} = require('../pageObjects/InventoryMainSearch');

test('Inventory GUI App login,search,save,delete save, and check the column list', async ({ page }) => {
    
    //INPUTS
    const searchText = "AB30360v6E.LIVE";
    const saveText = "AB30360v6E.LIVE.SAVE";
    const expectedHeaders = ['Primary ID', 'Id', 'Asset Class', 'Sub Asset Class' , 'Brand' , 'Country' , 'Inst Class' , 'Location Type','CCY 1', 'CCY 2','Record Set','Skew', 'Tenor', 'Model', 'Price Type', 'Prod Type', 'Convention', 'Expiry', 'Origin Service', 'Origin Subject', 'RIC', 'Tile', 'Tile Desc', 'BBG Full Ticker', 'EID', 'BBG Ticker', 'BBG Price Source', 'PDP', 'PDP Type', 'PDP Desc', 'PE', 'PE Perm', 'PE Desc', 'KDB Table', 'FIX Feed', 'Last Update'];
    const firstToRight = ['Id', 'Primary ID', 'Asset Class', 'Sub Asset Class' , 'Brand' , 'Country' , 'Inst Class' , 'Location Type','CCY 1', 'CCY 2','Record Set','Skew', 'Tenor', 'Model', 'Price Type', 'Prod Type', 'Convention', 'Expiry', 'Origin Service', 'Origin Subject', 'RIC', 'Tile', 'Tile Desc', 'BBG Full Ticker', 'EID', 'BBG Ticker', 'BBG Price Source', 'PDP', 'PDP Type', 'PDP Desc', 'PE', 'PE Perm', 'PE Desc', 'KDB Table', 'FIX Feed', 'Last Update'];
    
    //#1. Login    
    const loginPage = new InventoryLoginPage(page);
    
    await loginPage.goto();
    await loginPage.validLogin(); 
    //Assert Login
    const bool = await page.locator(".navbar-brand").isVisible();
    expect(bool).toBeTruthy();
    //Print it
    const title = await page.locator('a.navbar-brand').textContent();
    console.log('App Title:', title.trim());
    //Ignore the SSO logs
    page.on('console', msg => {
        if (!msg.text().includes('BSSO Telemetry')) {
          console.log(msg.text());
        }
      });

    //#2. Search and Save
    const searchPage = new InventoryMainSearch(page);
    await searchPage.validSearch(searchText,saveText)

    //#3. Checking on Columns
    await searchPage.validateColumns(expectedHeaders); 
});
class MyCartPage{

    constructor(page){

        this.page = page;
    
    }




}
module.exports = {MyCartPage}; // Need to be Import from main

/**
 *  await page.locator("div li").first().waitFor(); ? what is this?
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
 */
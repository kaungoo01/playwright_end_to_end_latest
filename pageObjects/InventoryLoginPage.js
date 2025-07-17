class InventoryLoginPage {


    //All the objects "page" aka locators
    constructor(page)
    {   
        this.page = page;
        this.userName = page.locator("button[class='btn btn-outline-primary btn-sm']"); // Azure Login

    }
    
    //url
    async goto()
    {
        await this.page.goto("https://tbfenicsmd-vq1.ny.cantor.com:3000/");
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
    
    //All the actions for these locators, Method "validLogin"
    async validLogin(){
        await this.userName.click();
        
    
    }
    
    };
    
    module.exports = {InventoryLoginPage}; // Need to be Import from main
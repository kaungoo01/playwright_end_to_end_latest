import { test, expect, Locator,Page } from '@playwright/test';
export class LoginPage {

    page: Page;
    userName: Locator;
    passWord:Locator;
    signInbutton:Locator;


//All the objects "page" aka locators
constructor(page:Page)
{   
    this.page = page;
    this.userName = page.locator("#userEmail"); // User Name
    this.passWord = page.locator("#userPassword"); // Password
    this.signInbutton = page.locator("[value='Login']"); //sign in button
}

//url
async goto()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

//Methods "validLogin"
//All the actions for these locators
async validLogin(userName:string,passWord:string){
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}

};
module.exports = {LoginPage}; // Need to be Import from main
class LoginPage {


//All the objects "page" aka locators
constructor(page)
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
async validLogin(userName,passWord){
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}

};
module.exports = {LoginPage}; // Need to be Import from main
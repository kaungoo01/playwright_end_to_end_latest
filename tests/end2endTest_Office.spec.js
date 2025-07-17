const { test, expect } = require('@playwright/test');
const { type } = require('os');
const { text } = require('stream/consumers');

//test annotation(test title , function name)

test('Test 1: Client Login , Place Order, and Validate the OrderID', async ({ browser }) => {
    //chrome --plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    //locator + sent text use > fill method
    //Login page

    //First Name
    const emailID = page.locator("#userEmail");
    const email = "kaung79@hotmail.com"
    await emailID.fill(email);

    //Password
    const passwordID = page.locator("#userPassword");
    await passwordID.fill("Totetote01");

    //clickLogin
    const clickLogin = page.locator("#login");
    await clickLogin.click();

    //log page Title
    console.log(await page.title());

    //Title
    const pageTitle = (await page.title());

    //####Wait until network is Idel, not busy#####
    await page.waitForLoadState('networkidle');

    //Grep the Text of Product Title, we need TextContent, or we wait, from above.
    //card-body (parent) > b (child)

    const titleProd = await page.locator(".card-body b").allTextContents();
    console.log(titleProd);

    //Pick ZARA COAT3
    //Iterate through items
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) //locator scope is inside the products ".card-body" within that tag
                                                                              //products.nth(i) > locator = Start from ".card-body" > chained to > "b" 
                                                                              // "b" Tag is where the productName , where are searching for.
                                                                              //Extract by using .textContent
                                                                              //compare with product Name.
        {
            //click it | add a card
            console.log("Fount it!");
            await products.nth(i).locator("text= Add To Cart").click();    //withint products.nth(i) > locator = Start from ".card-body" > 
            console.log("Click it!");                                      //find a locator has text = Add To Cart > Click it.
            break;
        }
    }
    //await page.pause(); //Pause the browser

    //click at the cart button
    await page.locator("[routerlink*='cart']").click();
    
    //It will take some time for page to load
    //Issue .isVisible isn't apart of Auto-wait 
    //Solucation to wait until item 'li tag' show up, waitFor(), visiable is not auto-wait
    //first(), one from multiple elements
    await page.locator("div li").first().waitFor(); //IMPORTANT wait for the first element to be load

    //Assertation isVisible() and toBeTruthy()
    //locator base on text called, ZARA COAT 3
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //visiable is not auto-wait //IMPORTANT search via tag has text
    expect(bool).toBeTruthy();

    //Click CheckOut
    await page.locator("text=Checkout").click();

    //On country, we need to type one at a time sequentially 'ind'
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100}); //IMPORTANT

    //capture the dropdown section
    const dropdown = page.locator(".ta-results"); //dot for class

    //wait for it
    await dropdown.waitFor();

    //Count the Buttons
    const optionsCount = await dropdown.locator("button").count();

    //Forloop
    for (let i = 0; i < optionsCount; i++)
        {   
            //Find the text that is equal to India
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " India") //put a space
            {
                //Found it, click that option
                await dropdown.locator("button").nth(i).click();
                break;
            }
        } 
    //Forloop END
    
    //Assert email address on the location
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //.user__name [type='text'] two location, .first will give the 1st item.

    //Credit Card Information
    const creditCardNum = page.locator("form .text-validated");    
    await creditCardNum.fill("4500 9930 9193 2593",{delay:100});

    //Expire Date
    const creditCardXDate =  page.locator("select.input.ddl").first();
    //Click it
    await creditCardXDate.click();
    //Select it
    await creditCardXDate.selectOption("02");
    
    //Expire Year
    const creditCardXYear = page.locator("select.input.ddl").last();
    //Click it
    await creditCardXYear.click();
    //Select it
    await creditCardXYear.selectOption("20");

    //CVV code
    const cvvCode = page.locator("div.field.small > input.input.txt").first();
    
    await cvvCode.click();
    await cvvCode.fill("123");


    //Name on Card
    const nameOnCard = page.locator('input[type="text"]').nth(2);

    await nameOnCard.click();
    await nameOnCard.fill("Kaung Myat Oo");

    //Apply Code
    const applyCode = page.locator("div.row div.field > input.input.txt").last();
        
    await applyCode.click();
    await applyCode.fill("5678")

    //Apply Coupon Button
    const applyCouponButton = page.locator("div.field.small > button.btn.btn-primary.mt-1");
    await applyCouponButton.click();

    //await page.pause();

    //Click Place Order
    await page.locator(".action__submit").click();
    
    
    //Assertion on Confirmation Page.
    //Get the conf order
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //const orderID = await page.locator(".em-spacer-1.ng-star-inserted");
    console.log(orderID);

    //await page.pause();

    //orderHistory = await page.locator('button[routerlink*='myorders']');
    //Click at Order History
    const  orderHistoryLink =  page.locator("button[routerlink*='myorders']");  
    await orderHistoryLink.click();

    //**Wait til page load**
    await page.locator("tbody").waitFor();    
    
    //Find the page from orderID
    //add all the rows
    const rows = await page.locator("tbody tr");

    //forLoop
    for (let i = 0; i < await rows.count(); i++) //don't forget count //IMPORTANT tbody tr th , will highlight all the column of ORder IDs
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click(); // That row's first come button, which is Edit button
            break;
        }
            
    }

    await page.pause();

    //Get the order ID from order's detail page
    const orderIdDetail = await page.locator(".col-text").textContent();
    console.log("Order Id on Detail: ",{orderIdDetail});

    //Assertion
    expect(orderID.includes(orderIdDetail)).toBeTruthy();


});
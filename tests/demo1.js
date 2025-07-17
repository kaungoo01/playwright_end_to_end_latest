"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message1 = "Hello"; //String static typing Hello in the message variable.
message1 = "Bye";
//console.log(message1);
var age1 = 20;
//console.log(age1);
var isActive = false;
//console.log(isActive);
var number1 = [1, 2, 3, 4];
//console.log(number1);
//you can put 'any', it will react like JS.
var data = "Anything!";
data = 123;
//console.log(data);
//Functions in TS
function add(a, b) {
    return a + b;
}
console.log(add(3, 4));
//Objects
var user = { name: "Bob", age: 34 };
console.log(user.name);
//Classes
/*
class CartPage
{
    //Type Declaration
    page:Page;
    products:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;

constructor(page) {
        //locators, !!!Question, where is these products, productTest coming from? Declare it

        this.page = page;
        this.products = page.locator(".card-body"); // all the cards
        this.productsText = page.locator(".card-body b"); // all the cards Title Text
        this.cart = page.locator("[routerlink*='cart']") //Add to cart button
        this.orders = page.locator("button[routerlink*='myorders']"); //Orders
    }
        } */

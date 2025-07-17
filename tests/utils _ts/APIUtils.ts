//const { expect } = require('@playwright/test');
export class APIUtils {
    //#2. Create local apiContext constructor, so that getToken and createOrder can access this instance, use "this."
    apiContext:any;
    loginPayLoad:string;


    constructor(apiContext:any,loginPayLoad:string) { //#4. adding loginPayload
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    //#1. Methods getToken + async
    async getToken() {
        //Execute the login API
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",           //end point , 'post' call
            { data: this.loginPayLoad }    //#4. this class Payload                                                      //sent data obj
        )
        //Assert status 200
        console.log("Login Response Status:", loginResponse.status());
        console.log("Login Response Text:", await loginResponse.text());
        //expect(loginResponse.ok()).toBeTruthy();
        //**Capture token body in variable**
        const loginResponseJson = await loginResponse.json();
        //**Save its token, we will re-use this on login parameter**
        const token = await loginResponseJson.token;
        //Print that login token
        console.log("Retrieved Token:",token);
        return token; //Return This Token
    }

    //#3. Methods createOrder + async , accessing token via "this." currentclass getToken method
    async createOrder(orderPayLoad:string) {
        
        let response ={token:String,orderId:String} //#6 Empty Javascript object - Need to add as token
        response.token = await this.getToken(); //#7 Assign into response object with Token

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': `Bearer ${response.token}`, //this for this current class
                    'Content-Type': 'application/json'
                },
            })
        
        console.log("Login Order Status:", orderResponse.status());
        console.log("Login Order Text:", await orderResponse.text());    
        const orderResponseJson = await orderResponse.json();
        console.log("Order Response JSON:",orderResponseJson);

        //Exception Handling
        if (
            !orderResponseJson.orders ||
            !Array.isArray(orderResponseJson.orders) ||
            orderResponseJson.orders.length === 0
        ) {
            throw new Error("No orders found in the response");
        }

        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId; //#6 Assign into response object with OrderID
        return response; //Return This used to be OrderID now we have reponse that has token and orderId


    }
}
module.exports = { APIUtils }; //#5.export this to Part3 file.
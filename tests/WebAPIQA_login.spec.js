const { test, expect, request } = require('@playwright/test');
const { type } = require('os');
const loginPayLoad = {
                    "grant_type": "authorization_code",
                    "redirect_uri": "https://rffmdwebapi-vq1.cad.local:3000/signin",
                    "code": "8a6bcf2d-ea84-443e-8a09-d4ed428d4cc0.e7e4d56b-22f1-440f-8b65-31a27a810026.c05751bc-98d7-4623-a96f-0efeb9a0f4d5",
                    "code_verifier": "7f23a05613ea4bedbe569a3574def380c27a0e552159408fb60c0558483b1b4f1253bffec2aa47cba499193ff25d30b6",
                    "client_id": "fenics-marketdata-webapi-qa"
};
let token; //Keep token accessiable Global

test.beforeAll(async ()=> {
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Convert the payload to URL-encoded format
    const urlEncodedData = new URLSearchParams(loginPayLoad).toString();
    //Execute the login API
    const loginResponse = await apiContext.post("https://rffmdwebapi-vq1.cad.local:9443/realms/fenics-market-data-develop/protocol/openid-connect/token",           //end point , 'post' call
        { data: urlEncodedData,   // Send the URL-encoded data                                                                                 //sent data obj
         
            headers: 
            {
                'Authorization': token,
                'Content-Type' : 'application/x-www-form-urlencoded'
            }    
        }   
);    
    //Assert status 200
    //expect(loginResponse.ok()).toBeTruthy();                                                         
    //**Capture token body in variable**
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    //**Save its token, we will re-use this on login parameter**
    token = await loginResponseJson.id_token;
    //Print that login token
    console.log(token);
});

test('Test 1: Login with API', async ({ page }) => {
    
    //We will insert the token > to our local storage
    //TO insert the token, we need to exe the javascript expression
    page.addInitScript(value =>{

        window.localStorage.setItem('token',value); //Function  
    },token);                                       //Parameter from the token object
    //satisfied login 
    //checking the page
    
    await page.goto("https://rffmdwebapi-vq1.cad.local:3000/");
    console.log("Login success!")
});

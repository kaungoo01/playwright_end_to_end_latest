const base = require('@playwright/test');

exports.customtest = base.test.extend(

    {
       //we give page as Fixtures, we gave browser as Fixtures
       //we can give custom Fixtures as well
       testDataForOrder :{
        userName: "kaung79@hotmail.com",
        passWord: "Totetote01",
        productName: "ZARA COAT 3" }
    }
)
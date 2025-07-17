import{test as baseTest} from '@playwright/test';
//referrel as bastTest from test

interface TestDataForOrder{
    userName:string;
    passWord:string;
    productName:string;
}; //interface standards to apply in the testDataForOrder

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>( //extending my baseTest with these below values

    {
       testDataForOrder :{
        userName: "kaung79@hotmail.com",
        passWord: "Totetote01",
        productName: "ZARA COAT 3" }
    }
)
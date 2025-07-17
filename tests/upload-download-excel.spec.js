//create a class
const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const { type } = require('os');

//**Create async Function */
async function writeExcelTest(searchText, replaceText, change, filePath) { //*2. searchText

    //Handle ExcelSheet
    const workbook = new ExcelJs.Workbook(); //workbook level
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1'); //Sheet level

    //print all in Sheet
    const output = await readExcel(worksheet, searchText); //This worksheet & *3. searchText paramter as output

    //#3. locate row and column
    const cell = worksheet.getCell(output.row, output.column + change.colChange); //getting from global object output.
    //Replace in the cell
    cell.value = replaceText;
    //Save aka Write
    await workbook.xlsx.writeFile(filePath);
    console.log("File got saved!");

    //async Func End
}


//#1. Add the Read Excel into one function
async function readExcel(worksheet, searchText) {//need worksheet as parameter & *4. searchText
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //If I find something value, give me that location!
            if (cell.value === searchText) { //*searchText

                console.log("row number is :" + rowNumber)//Print the row number
                console.log("col number is :" + colNumber)//Print the col number

                //Saved into output object
                output.row = rowNumber;
                output.column = colNumber;
            }

        })
    })
    //Read Excel ends 
    //Return the output back to  writeExcelTest
    return output;
}

//#1. Instead of calling the Function , we going to create a test to hit the download button
//writeExcelTest("Apple", 401, { rowChange: 0, colChange: 2 }, "C:/Users/koo/Downloads/download.xlsx"); //enter the *1.searchText as input 


test('Upload download excel validation',async ({page})=>
{   
    //text to Search, and value to change
    const textSearch = 'Apple';
    const updateValue = 600;
    //go to page
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    //waitForEvent*** Wait Until download is finished
    const downloadPromise = page.waitForEvent('download');
    //click at download, using getByRole
    await page.locator('#downloadButton').click();
    
    // Wait and save the download
    const download = await downloadPromise;
    //---
    const downloadPath = '/Users/koo/Downloads/download.xlsx';
    await download.saveAs(downloadPath);
    console.log('Download saved to:', downloadPath);
    //--
    //Updating an excel, Call the function
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, downloadPath); //download location
    
    //In Build Method, setInput, ONLY for type component is "file"
    await page.locator("#fileinput").setInputFiles(downloadPath);

    //Assertion
    const textLocator = page.getByText(textSearch)
    //IMPORTANT: search ONLY for this row of this element
    const desiredRow = await page.getByRole('row').filter({has : textLocator});
    //expect desireRow as it
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());

});


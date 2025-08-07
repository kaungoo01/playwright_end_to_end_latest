const { test, expect } = require('@playwright/test');

test('Report Manager: Create DB Handler', async ({ page }) => {
    const dbHandlerName = 'Automation DBHandler';
    const keySetJson = {
        "user": "CPQA2",
        "password": "cp2racq82",
        "url": "jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = nylqdbclntscan.gfinet.com)(PORT = 1521)) (LOAD_BALANCE = yes) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = creditqa.gfinet.com))) ",
        "portNumber": 0,
        "connectionFactoryClassName": "oracle.jdbc.pool.OracleDataSource",
        "validateConnectionOnBorrow": true,
        "connectionPoolName": "RPTMGR-CREDIT_POOL",
        "initialPoolSize": 0,
        "minPoolSize": 5,
        "maxPoolSize": 10,
        "abandonedConnectionTimeout": 600,
        "timeToLiveConnectionTimeout": 1200,
        "inactiveConnectionTimeout": 600,
        "maxIdleTime": 600,
        "timeoutCheckInterval": 30,
        "propertyCycle": 30,
        "maxStatements": 0,
        "connectionWaitTimeout": 90,
        "maxConnectionReuseTime": 0,
        "maxConnectionReuseCount": 200,
        "connectionHarvestTriggerCount": 2147483647,
        "connectionHarvestMaxCount": 1,
        "fastConnectionFailoverEnabled": true,
        "onsConfiguration": "nodes=nylqdbclntscan.gfinet.com:6200"
    };

    // Helper: Delete DB Handler if exists
    async function deleteDbHandlerIfExists() {
        const searchNameBox = page.getByRole('textbox', { name: /Search Name/i });
        await expect(searchNameBox).toBeVisible({ timeout: 10000 });
        await searchNameBox.fill('Auto');
        await searchNameBox.press('Enter');
        await page.waitForTimeout(1000);

        // Loop until no more matching rows
        while (true) {
            const rows = await page.getByRole('row').filter({ hasText: /auto/i }).all();
            if (rows.length === 0) break;

            for (const row of rows) {
                const menuButton = row.locator('button.dropdown-toggle');
                await menuButton.click();
                // Wait for dropdown to render
                await page.waitForSelector('.dropdown-menu.show', { timeout: 2000 });

                const deleteOption = page.locator('.dropdown-menu.show a[data-option="remove"].dbhandler-remove');
                await deleteOption.waitFor({ state: 'visible', timeout: 5000 });
                await deleteOption.click();

                const okButton = page.locator('.modal-footer .bootbox-accept');
                await okButton.waitFor({ state: 'visible', timeout: 5000 });
                await okButton.click();

                await page.waitForTimeout(1000);
            }

            // Refresh the search to update the table
            await searchNameBox.fill('Auto');
            await searchNameBox.press('Enter');
            await page.waitForTimeout(1000);
        }
    }

    try {
        // Login
        await page.goto('http://tbfenicsmd-vq2:23080/report-manager/login');
        await page.getByRole('button', { name: 'Login ' }).press('Enter');
        await page.getByPlaceholder('username').fill('kmoo');
        await page.getByPlaceholder('password').fill('testgfi');
        await page.getByRole('button', { name: 'Login ' }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('Menu')).toBeVisible();

        // Navigate to DB Handler
        await page.click('text=Menu');
        await expect(page.getByText('DB Handler')).toBeVisible();
        await page.click('text=DB Handler');
        await expect(page).toHaveURL(/.*db.*handler/i);

        // --- Clean up before test ---
        await deleteDbHandlerIfExists();

        // Add DB Handler
        await expect(page.getByText('Add DB Handler')).toBeVisible();
        await page.click('text=Add DB Handler');
        await expect(page.locator('input[name="name"]')).toBeVisible();
        await page.fill('input[name="name"]', dbHandlerName);
        await expect(page.locator('input[name="name"]')).toHaveValue(dbHandlerName);
        await page.selectOption('select[name="type"]', 'oracle');
        await expect(page.locator('select[name="type"]')).toHaveValue('oracle');
        //await page.fill('textarea[name="keySet"]', JSON.stringify(keySetJson, null, 2));
        // ...existing code...
        // Wait for the Ace Editor to be ready
        await page.waitForSelector('.ace_content');

        // Set the value in the Ace Editor using JavaScript
        await page.evaluate((jsonString) => {
            // Find the Ace Editor instance
            const aceEditors = window.ace?.edit ? [window.ace.edit(document.querySelector('.ace_content').closest('.ace_editor'))] : [];
            if (aceEditors.length > 0) {
                aceEditors[0].setValue(jsonString, -1); // -1 moves cursor to start, use 1 for end
            }
        }, JSON.stringify(keySetJson, null, 2));
        // ...Save it...
        await page.click('button:has-text("Save")');

        // (Optional) Screenshot for debugging
        await page.screenshot({ path: 'after-save.png', fullPage: true });

        // Wait for the "Search Name" textbox to appear (by role and label)
        const searchNameBox = page.getByRole('textbox', { name: /search name/i });
        await expect(searchNameBox).toBeVisible({ timeout: 10000 });

        // Search for the created DB Handler
        await searchNameBox.fill(dbHandlerName);
        await searchNameBox.press('Enter');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Find the row for the handler
        const dbHandlerRow = page.getByRole('row').filter({ hasText: dbHandlerName });
        await expect(dbHandlerRow).toBeVisible();

        // Click the left-side menu button in the row
        const menuButton = dbHandlerRow.locator('button.dropdown-toggle');
        await menuButton.click();

        // Wait for the dropdown and click the Edit option
        const editOption = page.locator('.dropdown-menu.show a[data-option="edit"].dbhandler-edit');
        await editOption.waitFor({ state: 'visible', timeout: 5000 });
        await editOption.click();

        // Assert Name
        const nameInput = page.locator('input[name="name"]');
        await expect(nameInput).toHaveValue(dbHandlerName);

        // Assert Type
        const typeSelect = page.locator('select[name="type"]');
        await expect(typeSelect).toHaveValue('oracle');

        // Assert KeySet in Ace Editor
        const keySetValue = await page.evaluate(() => {
            const ace = window.ace?.edit(document.querySelector('.ace_content').closest('.ace_editor'));
            return ace ? ace.getValue() : '';
        });
        let parsedActual, parsedExpected;
        try {
            parsedActual = JSON.parse(keySetValue);
            parsedExpected = { ...keySetJson, password: "*****" }; // Mask password for comparison
        } catch (e) {
            console.error('❌ Could not parse KeySet JSON:', e);
            throw new Error('KeySet JSON parse failed');
        }
        expect(parsedActual).toEqual(parsedExpected);
        console.log('✅ New Automation DBHandler has been create!');
        console.log('✅ KeySet matches expected JSON.');

        console.log('✅ All assertions passed for Edit view of Automation DBHandler.');
    } catch (error) {
        console.error('❌ Test failed:', error);
        throw error;
    }
});
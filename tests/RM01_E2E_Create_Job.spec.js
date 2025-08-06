const { test, expect, request } = require('@playwright/test');

test('Report Manager : Create a Job', async ({ page }) => //plain page only
//code
{
    //Global Jobname-
    const jobName = `AUTOMATION-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;
    console.log(`🔧 Testing with jobName: ${jobName}`);

    //Go to URL and Login
    await page.goto('http://tbfenicsmd-vq2:23080/report-manager/login');
    await page.getByRole('button', { name: 'Login ' }).press('Enter');
    await page.getByPlaceholder('username').fill('kmoo');
    await page.getByPlaceholder('password').fill('testgfi');
    await page.getByRole('button', { name: 'Login ' }).click();

    await page.waitForLoadState('networkidle'); // or 'domcontentloaded'
    // ✅ Wait for something that proves login succeeded
    await expect(page.getByPlaceholder('Search Description')).toBeVisible({ timeout: 10000 });

    // 3. Search for existing job
    await expect(page.getByPlaceholder('Search Description')).toBeVisible({ timeout: 10000 });
    // And for subsequent fills:
    await page.getByPlaceholder('Search Description').fill('');
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search Description').fill(jobName);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    const existing = await page.locator('td.cell-nowrap', { hasText: jobName }).count();
    if (existing > 0) {
        console.log(`ℹ️ Job "${jobName}" already exists. Skipping creation.`);
        return;
    }


    //Hit New Job and Enter some values
    console.log(`✅ Creating new job: ${jobName}`);
    await page.getByRole('button', { name: ' New Job' }).click();
    await page.getByLabel('Description:').click();
    await page.getByLabel('Description:').fill(jobName);
    await page.getByLabel('DB Handler* FRGHT CRDT FX').selectOption('61');
    await page.getByRole('tab', { name: ' Default Settings' }).click();
    await page.getByPlaceholder('filename', { exact: true }).click();
    await page.getByPlaceholder('filename', { exact: true }).fill('automationFile');
    await page.getByPlaceholder('uploadfolder').click();
    await page.getByPlaceholder('uploadfolder').fill('/credit/automation/');
    await page.getByRole('tab', { name: ' Fixed Parameters' }).click();
    await page.getByRole('tab', { name: ' SQL Query' }).click();

    // Wait for the ACE Editor to be ready
    const aceEditor = page.locator('#sqlEdit .ace_content');
    await expect(aceEditor).toBeVisible();
    // Click inside the ACE editor
    await aceEditor.click();
    // Type your SQL command
    await page.keyboard.type('select * from aws_handler');
    //Hit save
    await page.getByRole('button', { name: 'Save' }).click();

    // ✅ 6. Validate the job appears
    // These lines were incorrectly reverted in your latest attempt.
    // They should also use getByPlaceholder('Search Description')
    await page.getByPlaceholder('Search Description').fill('');
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search Description').fill(jobName);
    await page.waitForTimeout(3000);

    const cell = page.locator('td.cell-nowrap', { hasText: jobName });
    await expect(cell).toBeVisible();
    console.log(`✅ Job "${jobName}" created and verified in the list.`);
});
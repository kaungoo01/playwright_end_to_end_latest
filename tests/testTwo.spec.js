const { test, expect } = require('@playwright/test');

test('Login and extract token using browser context', async ({ browser }) => {
  // Launch a new browser context with necessary options
  const context = await browser.newContext({
    ignoreHTTPSErrors: true, // Ignore SSL errors if any
  });

  // Variable to store the token
  let token = null;

  // Open a new page in the context
  const page = await context.newPage();

  // Set up the listener to monitor network responses
  page.on('response', async (response) => {
    const url = response.url();

    // Log all network responses for debugging
    console.log(`Received response from: ${url}`);

    // Check if the URL contains the login endpoint
    if (url.includes('/client/auth/login') && response.status() === 200) {
      try {
        // Parse the response as JSON
        const body = await response.json();

        // Check if the response contains a token
        if (body.token) {
          token = body.token;
          console.log('Extracted Token:', token);
        } else {
          console.log('Token not found in response body:', body);
        }
      } catch (error) {
        console.error('Error parsing response JSON:', error);
      }
    }
  });

  // Navigate to the client login page
  await page.goto('https://rahulshettyacademy.com/client');

  // Use locators to fill in the login credentials and click the login button
  const emailID = page.locator("#userEmail");
  await emailID.fill("kaung79@hotmail.com"); // Replace with your actual email

  const passwordID = page.locator("#userPassword");
  await passwordID.fill("Totetote01"); // Replace with your actual password

  const clickLogin = page.locator("#login");
  await clickLogin.click();

  // Wait for navigation or page updates that indicate the login process is complete
  await page.waitForNavigation({ waitUntil: 'networkidle' });

  // Add a timeout to allow the response to be processed
  await page.waitForTimeout(2000);

  // Check if the token was captured
  if (token) {
    console.log('Successfully captured the token:', token);
  } else {
    console.log('Failed to capture the token. Please check the request interception.');
  }

  // Close the browser context
  await context.close();
});

const { test, expect, request } = require('@playwright/test');

const loginPayload = {
  userEmail: "kaung79@hotmail.com", // Replace with your actual email
  userPassword: "Totetote01"        // Replace with your actual password
};

test.describe('Extract Token Test', () => {

  test('Login and extract token', async () => {
    // Create a new API context
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Make a POST request to the login endpoint
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/client/', {
      data: loginPayload,
      headers: {
        'Content-Type': 'application/json',  // Ensure correct content type
      }
    });

    // Log the status code of the response
    console.log('Status:', loginResponse.status());

    // Log the response body to see what's being returned
    const responseBody = await loginResponse.text();
    console.log('Response Body:', responseBody);

    // Check if the response status is OK (200)
    expect(loginResponse.ok()).toBeTruthy();

    try {
      // Try to parse the response as JSON
      const loginResponseJson = JSON.parse(responseBody);

      // Extract the token if available
      const token = loginResponseJson.token;
      console.log('Extracted Token:', token);
    } catch (error) {
      // Log an error if JSON parsing fails
      console.error('Failed to parse response as JSON:', error);
    }
  });
});

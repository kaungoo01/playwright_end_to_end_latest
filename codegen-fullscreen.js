const { chromium } = require('playwright');

(async () => {
  // Get the URL from command-line arguments
  const url = process.argv[2];

  if (!url) {
    console.error("❌ Please provide a URL. Example: node codegen-fullscreen.js https://example.com");
    process.exit(1);
  }

  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'], // OS-level fullscreen
  });

  const context = await browser.newContext({
    viewport: null, // Uses full available screen size
  });

  const page = await context.newPage();
  await page.goto(url);

  // Start Playwright Inspector for interactive codegen
  await page.pause();

  console.log(`✅ Browser opened at ${url} in fullscreen. Press Ctrl+C to exit.`);
})();

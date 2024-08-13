import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';
import { json } from 'stream/consumers';
const config: PlaywrightTestConfig = {
  testMatch: ["LP_TradeLG.test.ts"]
};

export default defineConfig({
  testDir: './sites',
  /* Run tests in files in parallel */
  // ако искам паралелно тестване го правя на true
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
 
  

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
     actionTimeout: 4600000 ,
   
    /* Base URL to use in actions like `await page.goto('/')`. 
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: 'https://ecommerce-playground.lambdatest.io/index.php?',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
  },

  reporter: [["dot"],['json', {
    outputFile: "jsonReports/jsonReport.json"
  }], ["html", {
    open: "always"
  }]],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      
      use: { ...devices['Desktop Chrome'],viewport: {width:1920,height:980} },
      
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] ,viewport: {width:1920,height:980}  }, 
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] , viewport: {width:1920,height:980}  }, 
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    //    {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 13'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

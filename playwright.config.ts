import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 80000,
   
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    viewport: null,
    // 2. Pass flags to the browser executable on startup
    launchOptions: {
      args: ['--start-maximized'] 
    
    },
    
  },
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }] // Must match the testResults string in the Jenkinsfile
  ],


});
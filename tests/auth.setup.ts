import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../data/testData.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Perform login
  await loginPage.navigate();
  await loginPage.login(
    testData.loginCredentials.email,
    testData.loginCredentials.password
  );
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); 
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
});
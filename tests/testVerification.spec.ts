import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectBoard';
import testData from '../data/testData.json';

test.describe('Task Verification Tests - Data Driven', () => {
  // let loginPage: LoginPage;
  let projectPage: ProjectPage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    projectPage = new ProjectPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // // Login before each test
    // await loginPage.navigate();
    // await loginPage.login(
    //   testData.loginCredentials.email,
    //   testData.loginCredentials.password
    // );
  });

  // Data-driven test - loops through all test cases
  for (const testCase of testData.testCases) {
    test(`${testCase.id}: ${testCase.description}`, async ({ page }) => {
      // Step 1: Navigate to the project
      await projectPage.navigateToProject(testCase.project);

      // Step 2: Verify task is in the expected column
      await projectPage.verifyTaskInColumn(
        testCase.taskName,
        testCase.expectedColumn
      );

      // Step 3: Verify task has expected tags
      await projectPage.verifyTaskTags(
        testCase.taskName,
        testCase.expectedTags
      );
    });
  }
});
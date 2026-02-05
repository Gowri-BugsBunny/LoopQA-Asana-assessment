import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectPage } from '../pages/ProjectBoard';
import testData from '../data/testData.json';

test.describe('Task Verification Tests - Data Driven', () => {
  let projectPage: ProjectPage;

  test.beforeEach(async ({ page }) => {
    projectPage = new ProjectPage(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  for (const testCase of testData.testCases) {
    test(`${testCase.id}: ${testCase.description}`, async ({ page }) => {
      await projectPage.navigateToProject(testCase.project);
      await projectPage.verifyTaskInColumn(
        testCase.taskName,
        testCase.expectedColumn
      );
      await projectPage.verifyTaskTags(
        testCase.taskName,
        testCase.expectedTags
      );
    });
  }
});
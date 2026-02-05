import { Page, Locator, expect } from '@playwright/test';

export class ProjectPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(projectName: string) {
    // Click on the project name
    await this.page.click(`text="${projectName}"`);
    await this.page.waitForLoadState('networkidle');
  }

  async getTaskCard(taskName: string): Promise<Locator> {
    // Find the task card by its name
    return this.page.locator(`[data-testid="task-card"]:has-text("${taskName}"), .task-card:has-text("${taskName}"), div:has-text("${taskName}")`).first();
  }

  async verifyTaskInColumn(taskName: string, columnName: string) {
    // Locate the column
    const column = this.page.locator(`[data-testid="column"]:has-text("${columnName}"), .column:has-text("${columnName}"), div:has-text("${columnName}")`).first();
    
    // Verify task exists within that column
    const taskInColumn = column.locator(`text="${taskName}"`);
    await expect(taskInColumn).toBeVisible({ timeout: 10000 });
  }

  async verifyTaskTags(taskName: string, expectedTags: string[]) {
    // Get the specific task card container
    const taskCard = this.page.locator(`div.bg-white:has-text("${taskName}")`).first();
    // Verify each expected tag exists within THIS specific task card
    for (const tag of expectedTags) {
      // Count how many times this tag appears in the task card
      const tagCount = await taskCard.locator(`span.px-2:has-text("${tag}")`).count();
      // Assert at least one instance of the tag exists
      expect(tagCount).toBeGreaterThanOrEqual(1);
    }
  }
}
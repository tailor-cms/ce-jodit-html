import { expect, test } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test('Renders Edit component', async ({ page }) => {
  const editPanel = new pom.EditPanel(page);
  await editPanel.persistFocus();
  await expect(editPanel.editor).toBeVisible();
  await expect(editPanel.topToolbar).toBeVisible();
});

test('Renders Display component', async ({ page }) => {
  const displayPanel = new pom.DisplayPanel(page);
  await expect(displayPanel.editor).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const bottomPanel = new pom.BottomPanel(page);
  await expect(bottomPanel.el).toBeVisible();
  await bottomPanel.authoringTab.click();
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  for (const prop of properties) {
    await expect(bottomPanel.authoringWindow.getByText(prop)).toBeVisible();
  }
});

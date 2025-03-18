import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Renders Edit component', async ({ page }) => {
  const editFrame = page.frameLocator('#editPanel>iframe')
  await expect(editFrame.getByText('Authoring component')).toBeVisible();
  await expect(editFrame.getByText('Top toolbar')).toBeVisible();
  await editFrame.getByText('Persist').nth(0).click();
});

test('Renders Display component', async ({ page }) => {
  const displayFrame = page.frameLocator('#displayPanel>iframe')
  await expect(displayFrame.getByText('End-user component')).toBeVisible();
});

test('Renders server state panel', async ({ page }) => {
  const bottomPanel = page.locator('#panelBottom');
  const authoringTab = bottomPanel.getByRole('tab', { name: 'Authoring history' });
  await expect(authoringTab).toBeVisible();
  const userStateTab = bottomPanel.getByRole('tab', { name: 'End-user state history' });
  await expect(userStateTab).toBeVisible();
  await authoringTab.click();
  const properties = ['uid', 'type', 'meta', 'data', 'contentId'];
  for (const prop of properties) {
    await expect(bottomPanel.getByText(prop)).toBeVisible();
  }
});

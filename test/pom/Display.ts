import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly root: Locator;
  readonly content: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.editor.locator('.ce-jodit-html-root');
    this.content = this.root.locator('span').first();
  }
}

import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly wysiwyg: Locator;
  readonly placeholder: Locator;
  readonly boldBtn: Locator;
  readonly italicBtn: Locator;
  readonly underlineBtn: Locator;
  readonly strikeBtn: Locator;
  readonly undoBtn: Locator;
  readonly redoBtn: Locator;
  readonly orderedListBtn: Locator;
  readonly bulletListBtn: Locator;
  readonly superscriptBtn: Locator;
  readonly subscriptBtn: Locator;
  readonly horizontalRuleBtn: Locator;
  readonly clearFormattingBtn: Locator;
  readonly outdentBtn: Locator;
  readonly indentBtn: Locator;
  readonly selectAllBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.wysiwyg = this.editor.locator('.jodit-wysiwyg');
    this.placeholder = this.editor.locator('.jodit-placeholder');
    const toolbar = this.topToolbar;
    this.boldBtn = toolbar.getByRole('button', { name: 'Bold' });
    this.italicBtn = toolbar.getByRole('button', { name: 'Italic' });
    this.underlineBtn = toolbar.getByRole('button', { name: 'Underline' });
    this.strikeBtn = toolbar.getByRole('button', { name: 'Strike through' });
    this.undoBtn = toolbar.getByRole('button', { name: 'Undo' });
    this.redoBtn = toolbar.getByRole('button', { name: 'Redo' });
    this.orderedListBtn = toolbar.getByRole('button', {
      name: 'Insert Ordered List',
    });
    this.bulletListBtn = toolbar.getByRole('button', {
      name: 'Insert Unordered List',
    });
    this.superscriptBtn = toolbar.getByRole('button', { name: 'Superscript' });
    this.subscriptBtn = toolbar.getByRole('button', { name: 'Subscript' });
    this.horizontalRuleBtn = toolbar.getByRole('button', {
      name: 'Insert Horizontal Line',
    });
    this.clearFormattingBtn = toolbar.getByRole('button', {
      name: 'Clear Formatting',
    });
    this.outdentBtn = toolbar.getByRole('button', { name: 'Decrease Indent' });
    this.indentBtn = toolbar.getByRole('button', { name: 'Increase Indent' });
    this.selectAllBtn = this.editor.getByRole('button', { name: 'Select all' });
  }

  get allToolbarButtons(): Locator[] {
    return [
      this.undoBtn,
      this.redoBtn,
      this.boldBtn,
      this.italicBtn,
      this.underlineBtn,
      this.strikeBtn,
      this.orderedListBtn,
      this.bulletListBtn,
      this.superscriptBtn,
      this.subscriptBtn,
      this.horizontalRuleBtn,
      this.clearFormattingBtn,
      this.outdentBtn,
      this.indentBtn,
    ];
  }

  async typeIntoEditor(text: string) {
    await this.wysiwyg.click();
    await this.wysiwyg.pressSequentially(text);
  }

  async selectAll() {
    await this.selectAllBtn.click();
  }
}

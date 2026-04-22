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

  constructor(page: Page) {
    super(page);
    this.wysiwyg = this.editor.locator('.jodit-wysiwyg');
    this.placeholder = this.editor.locator('.jodit-placeholder');
    const tb = this.topToolbar;
    this.boldBtn = tb.locator('.jodit-toolbar-button_bold button');
    this.italicBtn = tb.locator('.jodit-toolbar-button_italic button');
    this.underlineBtn = tb.locator('.jodit-toolbar-button_underline button');
    this.strikeBtn = tb.locator('.jodit-toolbar-button_strikethrough button');
    this.undoBtn = tb.locator('.jodit-toolbar-button_undo button');
    this.redoBtn = tb.locator('.jodit-toolbar-button_redo button');
    this.orderedListBtn = tb.locator('.jodit-toolbar-button_ol button');
    this.bulletListBtn = tb.locator('.jodit-toolbar-button_ul button');
    this.superscriptBtn = tb.locator(
      '.jodit-toolbar-button_superscript button',
    );
    this.subscriptBtn = tb.locator('.jodit-toolbar-button_subscript button');
    this.horizontalRuleBtn = tb.locator('.jodit-toolbar-button_hr button');
    this.clearFormattingBtn = tb.locator('.jodit-toolbar-button_eraser button');
    this.outdentBtn = tb.locator('.jodit-toolbar-button_outdent button');
    this.indentBtn = tb.locator('.jodit-toolbar-button_indent button');
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
    await this.wysiwyg.focus();
    await this.wysiwyg.press('ControlOrMeta+a');
  }
}

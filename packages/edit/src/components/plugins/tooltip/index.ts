import { IJodit, Nullable } from 'jodit/esm/types';
import { UIBlock, UIForm, UIInput } from 'jodit/esm/core/ui/form';
import isFunction from 'lodash/isFunction';
import { Jodit } from 'jodit';
import { Plugin } from 'jodit/esm/modules';
import { UIButton } from 'jodit/esm/core/ui/button';

const TOOLTIP_CONTROL = 'tooltip';
const TOOLTIP_TAG = 'span';
const TOOLTIP_ATTR = 'data-tooltip';
const TOOLTIP_CLASS = 'tce-jodit-tooltip';

const isHtmlElement = (el: any) => el && el instanceof HTMLElement;
const isTooltipNode = (node: any) => {
  if (!node || !isFunction(node.hasAttribute)) return false;
  return node.hasAttribute(TOOLTIP_ATTR);
};

export const formTemplate = (jodit: IJodit) => {
  const tooltipInput = new UIInput(jodit, {
    name: 'tooltip',
    type: 'text',
    ref: 'tooltip_input',
    label: 'Tooltip',
    required: true,
  });
  const contentInput = new UIInput(jodit, {
    name: 'content',
    ref: 'content_input',
    label: 'Text',
  });
  const deleteBtn = new UIButton(jodit, {
    name: 'delete',
    variant: 'default',
    text: 'Delete',
  });
  const insertBtn = new UIButton(jodit, {
    name: 'insert',
    type: 'submit',
    variant: 'primary',
    text: 'Insert',
  });
  return new UIForm(jodit, [
    new UIBlock(jodit, [tooltipInput]),
    new UIBlock(jodit, [contentInput], { ref: 'content_input_box' }),
    new UIBlock(jodit, [deleteBtn, insertBtn], { align: 'full' }),
  ]);
};

export class TooltipPlugin extends Plugin {
  jodit: IJodit;

  constructor(jodit: IJodit) {
    super(jodit);
    this.jodit = jodit;
    this.buttons = [{ name: TOOLTIP_CONTROL, group: 'insert' }];
  }

  afterInit(jodit: IJodit) {
    jodit.events.on('generateTooltipForm', (current, close) =>
      this.createTooltipPopup(current, close),
    );
  }

  beforeDestruct(jodit: IJodit) {
    jodit.events.off('generateTooltipForm', (current, close) =>
      this.createTooltipPopup(current, close),
    );
  }

  createTooltipPopup(current: Nullable<Node>, close: () => void) {
    const { Dom, Helpers } = Jodit.modules;
    const form = formTemplate(this.jodit);
    const elements = Helpers.refs(form);
    const contentInput = elements.content_input as HTMLInputElement;
    const tooltipInput = elements.tooltip_input as HTMLInputElement;
    contentInput.value = current?.textContent || '';
    const tooltip = Dom.up(current, isTooltipNode, this.jodit.editor);
    if (tooltip) {
      const tooltipValue = tooltip.getAttribute(TOOLTIP_ATTR) || '';
      tooltipInput.value = tooltipValue;
      elements.insert.textContent = 'Update';
    } else {
      Dom.hide(elements.delete);
    }

    this.jodit.editor.normalize();
    const snapshot = this.jodit.history.snapshot.make();
    if (elements.delete) {
      this.jodit.events.on(elements.delete, 'click', (event: Event) => {
        event.preventDefault();
        this.jodit.history.snapshot.restore(snapshot);
        if (tooltip) Dom.unwrap(tooltip);
        this.jodit.selection.restore();
        this.jodit.synchronizeValues();
        close();
      });
    }

    const attachTooltip = () => {
      this.jodit.selection.restore();
      this.jodit.selection.removeMarkers();
      this.jodit.editor.normalize();
      this.jodit.history.snapshot.restore(snapshot);
      const tooltipEl = tooltip || document.createElement(TOOLTIP_TAG);
      const tooltipValue = tooltipInput.value;
      const innerText = contentInput.value;
      tooltipEl.setAttribute(TOOLTIP_ATTR, tooltipValue);
      tooltipEl.classList.add(TOOLTIP_CLASS);
      tooltipEl.innerText = innerText;
      if (!tooltip && innerText) this.jodit.selection.insertNode(tooltipEl);
      this.jodit.synchronizeValues();
      close();
    };

    if (Dom.isElement(form)) {
      this.jodit.events.on(form, 'submit', (event: Event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        attachTooltip();
        return false;
      });
    } else {
      form.onSubmit(attachTooltip);
    }
    return form;
  }
}

Jodit.defaultOptions.controls.tooltip = {
  isActive: (jodit) => {
    const { Dom } = Jodit.modules;
    const editor = (jodit as IJodit).editor;
    const selection = (jodit as IJodit).selection;
    if (!selection.isFocused()) return false;
    let start = selection.sel?.anchorNode as Nullable<Node>;
    if (start && start.nodeType !== Node.ELEMENT_NODE) {
      start = start.parentElement;
    }
    const condition = (el: Nullable<Node>) =>
      isHtmlElement(el) && (el as HTMLElement).matches(`.${TOOLTIP_CLASS}`);
    return !!Dom.up(start, condition, editor);
  },
  isDisabled: (jodit) => {
    const { Dom } = Jodit.modules;
    const editor = (jodit as IJodit).editor;
    const selection = (jodit as IJodit).selection;
    if (!selection.isFocused()) return false;
    let start = selection.sel?.anchorNode as Nullable<Node>;
    if (start && start.nodeType !== Node.ELEMENT_NODE) {
      start = start.parentElement;
    }
    const condition = (el: Nullable<Node>) =>
      isHtmlElement(el) && (el as HTMLElement).matches('table');
    return !!Dom.up(start, condition, editor);
  },
  popup: (editor, current, close) => {
    return editor.events.fire('generateTooltipForm', current, close);
  },
  tooltip: 'Insert Tooltip',
};
Jodit.plugins.add('tooltip', TooltipPlugin);

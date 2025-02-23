import { IJodit, Nullable } from 'jodit/esm/types';
import { UIBlock, UIForm, UIInput } from 'jodit/esm/core/ui/form';
import isFunction from 'lodash/isFunction';
import { Jodit } from 'jodit';
import { Plugin } from 'jodit/types/modules';
import { UIButton } from 'jodit/esm/core/ui/button';

const TOOLTIP_CONTROL = 'tooltip';
const TOOLTIP_TAG = 'span';
const TOOLTIP_ATTR = 'data-tooltip';
const TOOLTIP_CLASS = 'tce-jodit-tooltip';

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
  const unlinkBtn = new UIButton(jodit, {
    name: 'unlink',
    variant: 'default',
    text: 'Unlink',
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
    new UIBlock(jodit, [unlinkBtn, insertBtn], { align: 'full' }),
  ]);
};

export class TooltipPlugin extends Plugin<IJodit> {
  jodit: IJodit;

  constructor(jodit: IJodit) {
    super(jodit);
    this.jodit = jodit;
  }

  beforeDestruct() {}

  afterInit() {
    Jodit.defaultOptions.controls.tooltip = {
      name: TOOLTIP_CONTROL,
      tooltip: 'Insert Tooltip',
      popup: (_, current, close) => this.createTooltipPopup(current, close),
    };
  }

  createTooltipPopup(current: Nullable<Node>, close: () => void) {
    const { Dom, Helpers } = Jodit.modules;
    const form = formTemplate(this.jodit);
    const elements = Helpers.refs(form);
    const { unlink } = elements;
    const contentInput = elements.content_input as HTMLInputElement;
    const tooltipInput = elements.tooltip_input as HTMLInputElement;
    contentInput.value = current?.textContent || '';
    const tooltip = Dom.up(current, isTooltipNode, this.jodit.editor);
    if (tooltip) {
      const tooltipValue = tooltip.getAttribute(TOOLTIP_ATTR) || '';
      tooltipInput.value = tooltipValue;
    } else {
      Dom.hide(unlink);
    }

    this.jodit.editor.normalize();
    const snapshot = this.jodit.history.snapshot.make();
    if (unlink) {
      this.jodit.events.on(unlink, 'click', (event: Event) => {
        this.jodit.selection.restore();
        this.jodit.history.snapshot.restore(snapshot);
        if (tooltip) Dom.unwrap(tooltip);
        this.jodit.synchronizeValues();
        event.preventDefault();
        close();
      });
    }

    const attachTooltip = () => {
      this.jodit.selection.restore();
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

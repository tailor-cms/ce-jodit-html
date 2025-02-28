import { IControlType, IJodit, IToolbarButton, Nullable } from 'jodit/types';
import isString from 'lodash/isString';
import { Jodit } from 'jodit';
import { Plugin } from 'jodit/esm/modules';
import { Table } from 'jodit/types/modules';

const JODIT_COLORPICKER = '.jodit-color-picker';
const JODIT_COMMAND_BACKGROUND_COLOR = 'background';
const JODIT_COMMAND_TEXT_COLOR = 'forecolor';
const JODIT_PICKER_SELECTION_EVENTS = 'mousedown touchend';

const { Dom, Helpers } = Jodit.modules;
const { dataBind } = Helpers;

function onSelect(events: any, target: any, listener: any) {
  return events.on(target, JODIT_PICKER_SELECTION_EVENTS, listener);
}

function colorPopup(popup: HTMLElement, jodit: IJodit, close = () => {}) {
  const { events, options } = jodit;
  const pickers = getColorPickers(popup, {
    defaultTab: options.colorPickerDefaultTab,
  });

  // Add reset color buttons to main toolbar's colorpicker/s.
  onSelect(events, addResetButton(pickers.textColor), () => {
    jodit.execCommand(JODIT_COMMAND_TEXT_COLOR, false, '');
    close();
  });
  onSelect(events, addResetButton(pickers.backgroundColor), () => {
    jodit.execCommand(JODIT_COMMAND_BACKGROUND_COLOR, false, '');
    close();
  });

  return popup;
}

function inlineColorPopup(
  popup: HTMLElement,
  jodit: IJodit,
  table: Table,
  close = () => {},
) {
  const { events } = jodit;
  const pickers = getColorPickers(popup, { defaultTab: 'background' });

  // Add reset color buttons to inline toolbar's colorpicker/s.
  onSelect(events, addResetButton(pickers.textColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.color = ''));
    jodit.setEditorValue();
    close();
  });
  onSelect(events, addResetButton(pickers.backgroundColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.backgroundColor = ''));
    jodit.setEditorValue();
    close();
  });
  onSelect(events, addResetButton(pickers.borderColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.borderColor = ''));
    jodit.setEditorValue();
    close();
  });

  return popup;
}

function getColorPickers(
  popup: HTMLElement,
  { defaultTab }: { defaultTab: string },
) {
  const pickers = Array.from(popup.querySelectorAll(JODIT_COLORPICKER));
  if (pickers.length <= 0) return {};
  if (defaultTab === 'background') {
    const [backgroundColor, textColor, borderColor] = pickers;
    return { textColor, backgroundColor, borderColor };
  }
  const [textColor, backgroundColor, borderColor] = pickers;
  return { textColor, backgroundColor, borderColor };
}

function addResetButton(picker?: Element) {
  const btnResetColor =
    picker &&
    Array.from(picker.children)
      .filter((el) => el.classList.contains('jodit-color-picker__extra'))
      .pop();
  if (!btnResetColor) return document.createElement('span');
  btnResetColor.classList.add('btn_reset_color');
  btnResetColor.innerHTML = '';
  btnResetColor.appendChild(
    createButton({ icon: 'mdi-water-off', text: 'None' }),
  );
  return btnResetColor;
}

function createButton({ icon, text }: { icon: string; text: string }) {
  const btn = document.createElement('span');
  btn.setAttribute('role', 'button');
  btn.appendChild(createIcon(icon));
  btn.innerHTML += text;
  return btn;
}

function createIcon(name: string) {
  const icon = document.createElement('span');
  icon.classList.add('jodit_icon', 'mdi', name);
  return icon;
}

function updateColor(editor: IJodit, button: IToolbarButton) {
  const current = editor.s.current();
  const { style } =
    Dom.closest(current, (it) => Dom.isElement(it), editor.editor) ||
    editor.editor;
  const color = style.color || style.backgroundColor || style.borderColor;
  // @ts-expect-error - IToolbarButton interface is missing `button` property.
  button.button.style.color = color ?? '';
  button.state.icon.fill = color ?? '';
  button.state.activated = !!color;
  dataBind(button, 'color', null);
  dataBind(button, 'color-mode', null);
}

class CustomColorPicker extends Plugin {
  init(editor: IJodit) {
    const controls = editor.options.controls;
    const brush = controls.brush as IControlType;
    const brushCell = controls.brushCell as IControlType;
    const createBrushPopup = brush.popup ?? (() => false);
    const createBrushCellPopup = brushCell.popup ?? (() => false);

    brush.update = (jodit, button) => updateColor(jodit as IJodit, button);
    brush.popup = (jodit, current, close, button) => {
      const popup = createBrushPopup(jodit, current, close, button);
      if (!popup || isString(popup)) return popup;
      return colorPopup(popup as HTMLElement, jodit as IJodit, close);
    };

    brushCell.update = (jodit, button) => updateColor(jodit as IJodit, button);
    brushCell.popup = (jodit, current, close, button) => {
      const popup = createBrushCellPopup(jodit, current, close, button);
      if (!popup || isString(popup)) return popup;
      const table: Table = jodit.getInstance('Table', jodit.o);
      return inlineColorPopup(
        popup as HTMLElement,
        jodit as IJodit,
        table,
        close,
      );
    };
  }

  afterInit() {}
  beforeDestruct() {}
}

Jodit.plugins.add('customBrush', CustomColorPicker);

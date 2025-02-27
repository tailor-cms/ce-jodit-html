import { IControlType, IJodit, Nullable } from 'jodit/types';
import isString from 'lodash/isString';
import { Jodit } from 'jodit';
import { Plugin } from 'jodit/esm/modules';
import { Table } from 'jodit/types/modules';

const JODIT_COLORPICKER = '.jodit-color-picker';
const JODIT_COMMAND_BACKGROUND_COLOR = 'background';
const JODIT_COMMAND_TEXT_COLOR = 'forecolor';
const JODIT_PICKER_SELECTION_EVENTS = 'mousedown touchend';

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

function inlineColorPopup(popup: HTMLElement, jodit: IJodit, table: Table) {
  const { events } = jodit;
  const pickers = getColorPickers(popup, { defaultTab: 'background' });

  Object.values(pickers).forEach((picker) => {
    const selected = picker.querySelector('.active');
    if (selected) changeSelectedMarker(selected);

    jodit.events.on(picker, JODIT_PICKER_SELECTION_EVENTS, (event, picker) => {
      onColorChange(event, picker);
    });
  });
  // Add reset color buttons to inline toolbar's colorpicker/s.
  onSelect(events, addResetButton(pickers.textColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.color = ''));
    jodit.setEditorValue();
  });
  onSelect(events, addResetButton(pickers.backgroundColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.backgroundColor = ''));
    jodit.setEditorValue();
  });
  onSelect(events, addResetButton(pickers.borderColor), () => {
    const selectedCells = table.getAllSelectedCells();
    selectedCells.forEach((cell) => (cell.style.borderColor = ''));
    jodit.setEditorValue();
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

function onColorChange(event: Event, picker: Element) {
  const button = Jodit.modules.Dom.up(
    event.target as Nullable<Node>,
    (el) => (el as Element).matches('[data-color]'),
    picker,
  );
  if (!button) return;

  const selected = picker.querySelector('.active');
  if (!selected) return;

  if (button.classList.contains('btn_reset_color')) {
    selected.classList.remove('active');
    selected.innerHTML = '';
    return;
  }

  changeSelectedMarker(selected);
}

function changeSelectedMarker(selected: Element) {
  // Swap eye icon marking selected color with colorized bullet.
  selected.classList.add('selected_color_marker');
  const svg = selected.querySelector('svg');
  const circle = createIcon('mdi-circle');
  Object.assign(circle.style, {
    color: svg?.style.fill,
    fontSize: '8px',
  });
  selected.appendChild(circle);
}

function getColorLabel(button: any) {
  const iconContainer = button.button.querySelector('.jodit-icon_brush');
  const colorHelper = button.button.querySelector('.mdi-color-helper');
  if (!colorHelper || !iconContainer) return;
  colorHelper.style.color = iconContainer.style.fill;
}

class CustomColorPicker extends Plugin {
  init(editor: IJodit) {
    const controls = editor.options.controls;
    const brush = controls.brush as IControlType;
    const brushCell = controls.brushCell as IControlType;
    const createBrushPopup = brush.popup ?? (() => false);
    const createBrushCellPopup = brushCell.popup ?? (() => false);
    const brushUpdate = brush.update ?? (() => '');

    brush.popup = (jodit, current, close, button) => {
      const popup = createBrushPopup(jodit, current, close, button);
      if (!popup || isString(popup)) return popup;
      return colorPopup(popup as HTMLElement, jodit as IJodit, close);
    };

    brush.update = (jodit, button) => {
      brushUpdate(jodit, button);
      getColorLabel(button);
    };

    brushCell.popup = (jodit, current, close, button) => {
      const popup = createBrushCellPopup(jodit, current, close, button);
      if (!popup || isString(popup)) return popup;
      const table: Table = jodit.getInstance('Table', jodit.o);
      return inlineColorPopup(popup as HTMLElement, jodit as IJodit, table);
    };
  }

  afterInit() {}
  beforeDestruct() {}
}

Jodit.plugins.add('customBrush', CustomColorPicker);

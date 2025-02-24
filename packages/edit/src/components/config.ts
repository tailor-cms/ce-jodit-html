import { css, dataBind } from 'jodit/esm/core/helpers';
import { IJodit, IToolbarButton } from 'jodit/types';
import { Jodit } from 'jodit';

export const toolbarId = 'joditToolbar';

export const toolbarButtons = [
  'source',
  '|',
  'undo',
  'redo',
  'cut',
  'copyformat',
  '|',
  'paragraph',
  'font',
  'fontsize',
  '|',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  '|',
  'brush',
  '|',
  'link',
  'table',
  'image',
  'tooltip',
  'symbols',
  'hr',
  '|',
  'ol',
  'ul',
  'outdent',
  'indent',
  '|',
  'align',
  '|',
  'subscript',
  'superscript',
  '|',
  'eraser',
];

export const editorConfig = {
  toolbar: `#${toolbarId}`,
  buttons: toolbarButtons,
  sourceEditorNativeOptions: {
    mode: 'ace/mode/html',
    theme: 'ace/theme/chrome',
    showGutter: true,
  },
  addNewLine: false,
  addNewLineOnDBLClick: false,
  hidePoweredByJodit: true,
  beautifyHTML: true,
  controls: {
    superscript: { tooltip: 'Superscript' },
    subscript: { tooltip: 'Subscript' },
    ol: { command: 'insertOrderedList', list: undefined },
    ul: { command: 'insertUnorderedList', list: undefined },
    font: {
      list: Jodit.atom({
        '': 'Default',
        'Helvetica, sans-serif': 'Helvetica',
        'Arial, Helvetica, sans-serif': 'Arial',
        'Georgia, Palatino, serif': 'Georgia',
        'Impact, Charcoal, sans-serif': 'Impact',
        'Tahoma, Geneva, sans-serif': 'Tahoma',
        '"Times New Roman", Times, serif': 'Times New Roman',
        'Verdana, Geneva, sans-serif': 'Verdana',
      }),
      update(_editor: Jodit, button: IToolbarButton) {
        const value = button.state.value as string;
        const list = button.control.list as Record<string, string>;
        button.setState({ text: list[value] ?? 'Default' });
      },
      name: '',
    },
    fontsize: {
      update(_editor: Jodit, button: IToolbarButton) {
        button.setState({ text: button.state.value as string });
      },
      name: '',
    },
    brush: {
      update(editor: IJodit, button: any) {
        const { Dom } = Jodit.modules;
        const color = dataBind(button, 'color');
        const update = (key: string, value: string) => {
          if (value && value !== css(editor.editor, key).toString()) {
            button.state.icon.fill = value;
            button.button.style.color = value;
          }
        };
        if (color) {
          const mode = dataBind(button, 'color');
          update(mode === 'color' ? mode : 'background-color', color);
          return;
        }
        const current = editor.s.current();
        if (current && !button.state.disabled) {
          const currentBpx =
            Jodit.modules.Dom.closest(
              current,
              (node) => Dom.isElement(node),
              editor.editor,
            ) || editor.editor;
          update('color', css(currentBpx, 'color').toString());
          update(
            'background-color',
            css(currentBpx, 'background-color').toString(),
          );
        }
        button.button.style.color = undefined;
        button.state.icon.fill = '';
        button.state.activated = false;
      },
    },
    paragraph: {
      list: { p: 'Normal' },
      update(_editor: Jodit, button: IToolbarButton) {
        const value = button.state.value as string;
        const list = button.control.list as Record<string, string>;
        button.setState({ text: list[value] ?? 'Normal' });
      },
      tooltip: 'Style',
      name: '',
    },
  },
};

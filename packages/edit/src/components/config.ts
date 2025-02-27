import { Config } from 'jodit/types/config';
import { DeepPartial } from 'jodit/types';
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

export const editorConfig: DeepPartial<Config> = {
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
    },
    paragraph: {
      list: { p: 'Normal' },
      tooltip: 'Style',
    },
  },
};

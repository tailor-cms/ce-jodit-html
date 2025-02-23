import { IToolbarButton } from 'jodit/types';
import { Jodit } from 'jodit';

export const editorConfig = {
  autofocus: true,
  toolbarAdaptive: false,
  hidePoweredByJodit: true,
  sourceEditorNativeOptions: {
    mode: 'ace/mode/html',
    theme: 'ace/theme/chrome',
    showGutter: true,
  },
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

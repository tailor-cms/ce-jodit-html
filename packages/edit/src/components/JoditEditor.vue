<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="jodit-wrapper">
    <textarea ref="editorRef"></textarea>
  </div>
</template>

<script lang="ts" setup>
import 'jodit/esm/plugins/all.js';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { IToolbarButton } from 'jodit/types';
import { Jodit } from 'jodit';

import toolbarIcons from './toolbarIcons';

interface Props {
  modelValue: string;
  config?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
});

const emit = defineEmits(['update:modelValue']);

const editorRef = ref<HTMLTextAreaElement | null>(null);
const editor = ref<Jodit | null>(null);

toolbarIcons();

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return;
    if (editor.value.value !== value) editor.value.value = value;
  },
);

onMounted(() => {
  if (editorRef.value) {
    editor.value = Jodit.make(editorRef.value, {
      toolbar: '#joditToolbar',
      autofocus: true,
      toolbarAdaptive: false,
      language: 'en',
      events: { change: (val: string) => emit('update:modelValue', val) },
      placeholder: 'Enter your text...',
      hidePoweredByJodit: true,
      showXPathInStatusbar: false,
      disablePlugins: 'add-new-line',
      buttons: [
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
      ],
      sourceEditorNativeOptions: {
        mode: 'ace/mode/html',
        theme: 'ace/theme/chrome',
      },
      controls: {
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
          name: '',
        },
      },
    });
    editor.value.value = props.modelValue;
    editor.value.events.fire('getContainer', editor.value.toolbar.container);
  }
});

onBeforeUnmount(() => editor.value?.destruct());
</script>

<style lang="scss" scoped>
$icon-color: #333;
$icon-size: 18px;
$statusbar-height: 26px;
$statusbar-border-size: 1px;
$min-height: 140px;
$font-family-monospace:
  'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;

.jodit-wrapper {
  :deep(.jodit-container):not(.jodit_inline) {
    display: flex;
    border: none;
    min-height: $min-height;
    flex-direction: column;

    .jodit-workplace {
      border: none;
    }
  }

  :deep(.jodit-placeholder) {
    font-style: italic;
  }

  :deep(.jodit-source) {
    background: transparent;

    .ace-editor {
      font-size: 13px;
      font-family: $font-family-monospace;
    }
  }

  :deep(.jodit-status-bar) {
    margin-top: auto;
    border: none;
    height: $statusbar-height;
    background-color: transparent;
    line-height: $statusbar-height - $statusbar-border-size;

    .jodit-status-bar__item {
      line-height: inherit;
    }

    .jodit-toolbar-button {
      line-height: inherit;
      vertical-align: top;

      & > a {
        vertical-align: middle;
      }
    }
  }
}
</style>

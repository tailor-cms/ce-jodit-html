<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="jodit-wrapper">
    <textarea ref="editorRef"></textarea>
  </div>
</template>

<script lang="ts" setup>
import 'jodit/esm/plugins/all.js';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
const editorInstance = ref<Jodit | null>(null);

toolbarIcons();

watch(
  () => props.modelValue,
  (value) => {
    const editor = editorInstance.value;
    if (editor && editor.value !== value) editor.value = value;
  },
);

onMounted(() => {
  if (editorRef.value) {
    editorInstance.value = Jodit.make(editorRef.value, {
      toolbar: '#joditToolbar',
      autofocus: true,
      toolbarAdaptive: false,
      language: 'en',
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
    });
    editorInstance.value.value = props.modelValue;
    editorInstance.value.events.on('change', (val: any) =>
      emit('update:modelValue', val),
    );
  }
});

onBeforeUnmount(() => {
  editorInstance.value?.destruct();
});
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

      .jodit-icon {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        font-size: $icon-size;
        line-height: $icon-size;
        color: $icon-color;
      }
    }
  }
}
</style>

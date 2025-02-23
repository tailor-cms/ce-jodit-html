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

import './plugins/index.ts';
import { editorConfig } from './config.ts';
import { toolbarButtons } from './buttons.ts';
import toolbarIcons from './toolbarIcons';

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

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
      ...editorConfig,
      toolbar: '#joditToolbar',
      language: 'en',
      placeholder: 'Enter your text...',
      buttons: toolbarButtons,
      events: { change: (val: string) => emit('update:modelValue', val) },
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

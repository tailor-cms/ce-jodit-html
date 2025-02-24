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
      autofocus: true,
      toolbarAdaptive: false,
      language: 'en',
      placeholder: 'Enter your text...',
      addNewLineOnDBLClick: false,
      showTooltipDelay: 350,
      colorPickerDefaultTab: 'color',
      disablePlugins: ['fullsize'],
      events: { change: (val: string) => emit('update:modelValue', val) },
    });
    editor.value.value = props.modelValue;
    editor.value.events.fire('getContainer', editor.value.toolbar.container);
  }
});

onBeforeUnmount(() => editor.value?.destruct());
</script>

<style lang="scss" scoped>
.jodit-wrapper {
  :deep(.jodit-container) {
    border: none;
  }

  :deep(.jodit-workplace) {
    overflow: visible;
  }

  :deep(.jodit-wysiwyg) {
    overflow: visible;
    overflow-wrap: break-word;
  }

  :deep(.tce-jodit-tooltip) {
    $tooltip-color: #37474f;
    $border-size: 6px;

    position: relative;
    display: inline-block;
    background: rgb(205 215 220 / 70%);
    text-decoration: underline dotted $tooltip-color;
    cursor: help;

    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      border-left: $border-size solid transparent;
      border-right: $border-size solid transparent;
      border-top: $border-size solid $tooltip-color;
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + #{$border-size} - 1px);
      left: -0.625rem;
      border-radius: 4px;
      max-width: 18.75rem;
      padding: 0.25rem 0.675rem;
      background: $tooltip-color;
      font-size: 0.875rem;
      color: #fff;
    }

    &::before,
    &::after {
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.1s ease-out,
        margin 0.1s ease-out;
    }

    &:hover::after,
    &:hover::before {
      visibility: visible;
      opacity: 1;
      margin-bottom: 0.25rem;
    }
  }

  :deep(.jodit-container):not(.jodit_inline) {
    display: flex;
    border: none;
    min-height: 8.75rem;
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
  }

  :deep(.jodit-status-bar) {
    margin-top: auto;
    border: none;
    background-color: transparent;
  }
}
</style>

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
:deep(.jodit-container):not(.jodit_inline) {
  display: flex;
  border: none;
  min-height: 5rem;
  flex-direction: column;

  .jodit-workplace {
    background-color: transparent;
    border: none;
  }
}

:deep(.jodit-source) {
  background: transparent;
}

:deep(.jodit-status-bar) {
  margin-top: auto;
  border: none !important;
  background-color: transparent;

  .jodit-status-bar__item {
    line-height: inherit;
  }

  .jodit-toolbar-button {
    line-height: inherit;
    vertical-align: top;
  }
}
</style>

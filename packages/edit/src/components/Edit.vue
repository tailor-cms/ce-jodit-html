<template>
  <div class="tce-jodit-html text-left">
    <ElementPlaceholder
      v-if="!isFocused && !content && showPlaceholder"
      :is-disabled="isDisabled"
      :is-focused="isFocused"
      :name="`${manifest.name} component`"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the image"
      icon="mdi-image-plus"
    />
    <template v-else>
      <JoditEditor v-if="isFocused" v-model="content" />
      <div v-else class="jodit-container">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="jodit-wysiwyg" v-html="content"></div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import type { Element } from '@tailor-cms/ce-jodit-html-manifest';
import { ElementPlaceholder } from '@tailor-cms/core-components';
import manifest from '@tailor-cms/ce-jodit-html-manifest';

import JoditEditor from './JoditEditor.vue';

interface Props {
  element: Element;
  isFocused?: boolean;
  isDisabled?: boolean;
  isDragged?: boolean;
  showPlaceholder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFocused: false,
  isDisabled: false,
  isDragged: false,
  showPlaceholder: true,
});
const emit = defineEmits(['save']);

const content = ref(props.element?.data?.content ?? '');
const hasChanges = computed(() => {
  const previousValue = props.element?.data?.content ?? '';
  return previousValue !== content.value;
});

const save = () => {
  if (!hasChanges.value) return;
  const { element } = props;
  emit('save', { ...element.data, content: content.value });
};

watch(
  () => props.isFocused,
  (val) => !val && save(),
);

watch(
  content,
  debounce(() => save(), 4000),
);
</script>

<style lang="scss" scoped>
$min-width: 11.25rem;
$min-height: 8.75rem;
$min-height-sm: 5.5rem;

.jodit-container {
  min-width: $min-width;
  min-height: $min-height;
}

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

:deep(.jodit-container):not(.jodit-inline) {
  min-height: $min-height !important;
  background: transparent !important;
  font-size: 1rem;
  border: none;
}
</style>

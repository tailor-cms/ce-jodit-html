<template>
  <div class="tce-jodit-html text-left">
    <JoditEditor v-if="isFocused" v-model="content" />
    <div v-else class="jodit-container">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="!isEmpty" class="jodit-wysiwyg" v-html="content"></div>
      <div v-else class="jodit-wysiwyg jodit-placeholder">
        Enter your text...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { Element, ElementData } from '@tailor-cms/ce-jodit-html-manifest';
import { debounce } from 'lodash-es';

import JoditEditor from './JoditEditor.vue';

interface Props {
  element: Element;
  isDragged?: boolean;
  isFocused?: boolean;
  isReadonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDragged: false,
  isFocused: false,
  isReadonly: false,
});
const emit = defineEmits<{ save: [data: ElementData] }>();

const content = ref(props.element?.data?.content ?? '');
const isEmpty = computed(() => !content.value.replace(/<[^>]*>/g, ''));
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
$min-height: 5rem;

.jodit-container {
  min-width: $min-width;
  min-height: $min-height;
}

:deep(.jodit-container) {
  border: none;
}

:deep(.jodit-workplace) {
  overflow: visible !important;
}

:deep(.jodit-wysiwyg) {
  overflow: visible !important;
  overflow-wrap: break-word;
}

:deep(.jodit-placeholder) {
  color: rgba(0, 0, 0, 0.5);
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
    padding: 0.5rem 0.675rem;
    background: $tooltip-color;
    font-size: 0.875rem;
    color: #fff;
    font-weight: normal;
    line-height: 1.1;
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
  background: transparent;
  font-size: 1rem;
  border: none;
}

:deep(.jodit-container) .jodit-wysiwyg {
  * {
    word-break: break-word;
  }

  > * + * {
    margin-top: 0.75em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2.25rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.75rem;
  }

  h5 {
    font-size: 1.5rem;
  }

  h6 {
    font-size: 1.25rem;
  }

  blockquote {
    padding: 0.25rem 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-style: italic;
  }

  ul,
  ol {
    padding: 0 1.25rem;
  }

  code {
    font-family: 'Source Code Pro', monospace !important;
    background: #eee;
    padding: 0.125rem 0.5rem;
    border-radius: 8px;
  }

  pre {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    background: #eee;
    // white-space: pre-wrap;

    code {
      padding: 0;
      font-size: 0.875rem;
      background: none;
    }
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.12);
    text-align: left;

    th,
    td {
      padding: 0.75rem;
    }

    th {
      background-color: #fafafa;
    }

    td {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>

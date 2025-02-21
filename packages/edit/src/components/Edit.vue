<template>
  <div class="tce-jodit-html">
    <JoditEditor v-if="isFocused" v-model="content" />
    <div v-else class="jodit-container">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="jodit-wysiwyg" v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import { Element } from '@tailor-cms/ce-jodit-html-manifest';

import JoditEditor from './JoditEditor.vue';

interface Props {
  element: Element;
  isFocused?: boolean;
  isDisabled?: boolean;
  isDragged?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFocused: false,
  isDisabled: false,
  isDragged: false,
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
$border-size: 6px;
$tooltip-color: #37474f;

.jodit-container {
  min-width: $min-width;
  min-height: $min-height;
}

:deep(.tce-jodit-html) {
  text-align: initial;

  .jodit-container {
    border: none;
  }

  .jodit-workplace,
  .jodit-wysiwyg {
    overflow: visible;
  }

  .jodit-wysiwyg {
    overflow-wrap: break-word;
  }

  .tce-jodit-tooltip {
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
      border-radius: 2px;
      min-width: 9.375rem;
      max-width: 18.75rem;
      padding: 0.375rem;
      background: $tooltip-color;
      font-size: 0.9em;
      text-align: center;
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
}

:deep(.jodit-container):not(.jodit-inline) {
  min-height: $min-height !important;
  background: transparent !important;
  font-size: 1rem;
  border: none;
}

.jodit-html-placeholder {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0;
  min-height: $min-height;
  padding: 0.5rem 0 0;

  .placeholder-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 3.75rem;
    height: 3.75rem;
    padding-top: 0.125rem;
    background: #263238;
    font-size: 2rem;
    line-height: 2rem;
    color: #f1f1f1;

    .divider {
      font-size: 0.75rem;
    }
  }

  .message {
    padding: 0.5rem 0;
    font-size: 1rem;
    line-height: 1.75rem;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    text-align: center;

    span {
      display: block;
    }

    .heading {
      padding: 0.5rem 0;
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
}

.tce-jodit-html.disabled {
  .placeholder-avatar {
    background: #424242;
  }

  .message {
    color: #424242;
  }
}

.tce-jodit-html.sm {
  .jodit-container {
    min-height: $min-height-sm;
  }

  :deep(.jodit-container):not(.jodit-inline) {
    min-height: $min-height-sm;
  }

  .jodit-html-placeholder {
    min-height: $min-height-sm;

    .placeholder-avatar {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .message {
      padding: 0;
    }

    .heading {
      padding: 0.5rem 0 0;
      font-size: 0.875rem !important;
      line-height: 1.25rem;
      font-weight: 500;
    }
  }
}
</style>

<template>
  <div class="ce-jodit-html-root">
    <!-- eslint-disable-next-line -->
    <span v-html="element.data.content" />
  </div>
</template>

<script setup lang="ts">
import { Element } from '@tailor-cms/ce-jodit-html-manifest';

defineProps<{ element: Element }>();
</script>

<style scoped lang="scss">
.ce-jodit-html-root {
  :deep(span) {
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
}
</style>

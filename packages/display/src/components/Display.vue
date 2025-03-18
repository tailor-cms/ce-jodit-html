<template>
  <div class="ce-jodit-html-root">
    <!-- eslint-disable-next-line -->
    <span v-html="data.content" />
  </div>
</template>

<script setup lang="ts">
import { ElementData } from '@tailor-cms/ce-jodit-html-manifest';

defineProps<{ id: number; data: ElementData }>();
</script>

<style scoped lang="scss">
.ce-jodit-html-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>

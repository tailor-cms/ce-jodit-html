import type { HookMap, ServerModule } from '@tailor-cms/cek-common';
import type { Element } from '@tailor-cms/ce-jodit-html-manifest';
import manifest from '@tailor-cms/ce-jodit-html-manifest';

export const hookMap: HookMap<Element> = new Map();

const serverModule: ServerModule<Element> = {
  ...manifest,
  hookMap,
};

export default serverModule;

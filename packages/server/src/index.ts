import { ai, initState, type } from '@tailor-cms/ce-jodit-html-manifest';
import type { HookMap, ServerModule } from '@tailor-cms/cek-common';
import type { Element } from '@tailor-cms/ce-jodit-html-manifest';

export const hookMap: HookMap<Element> = new Map();

const serverModule: ServerModule<Element> = {
  type,
  initState,
  hookMap,
  ai,
};

export default serverModule;
export { type, initState, ai };

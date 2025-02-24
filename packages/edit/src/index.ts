import 'jodit/es2021/jodit.min.css';
import baseManifest from '@tailor-cms/ce-jodit-html-manifest';
import type { ElementManifest } from '@tailor-cms/ce-jodit-html-manifest';

import Edit from './components/Edit.vue';
import TopToolbar from './components/TopToolbar.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Edit,
  TopToolbar,
};

export default manifest;
export { Edit, TopToolbar };

import { Jodit } from 'jodit';
import { map } from 'lodash-es';

const mdiIcons = {
  source: 'code-tags',
  bold: 'format-bold',
  strikethrough: 'format-strikethrough',
  underline: 'format-underline',
  italic: 'format-italic',
  superscript: 'format-superscript',
  subscript: 'format-subscript',
  ul: 'format-list-bulleted',
  ol: 'format-list-numbered',
  outdent: 'format-indent-decrease',
  indent: 'format-indent-increase',
  font: 'format-font',
  fontsize: 'format-size',
  paragraph: 'format-pilcrow',
  image: 'image-plus',
  tooltip: 'tooltip-text',
  file: 'file-plus',
  video: 'video-plus',
  table: 'table-plus',
  link: 'link',
  /* align */ ...{
    left: 'format-align-left',
    center: 'format-align-center',
    right: 'format-align-right',
    justify: 'format-align-justify',
  },
  undo: 'undo',
  redo: 'redo',
  cut: 'content-cut',
  hr: 'minus',
  eraser: 'format-clear',
  copyformat: 'format-paint',
  symbols: 'omega',
  fullsize: 'arrow-expand-all',
  'select-all': 'select-all',
  print: 'printer',
  dots: 'dots-vertical',
  cancel: 'close',
  // popup toolbar icons
  valign: 'format-align-top',
  splitv: 'format-columns',
  merge: 'table-merge-cells',
  addcolumn: 'table-column-plus-after',
  addrow: 'table-row-plus-after',
  bin: 'trash-can',
  eye: 'eye',
  unlink: 'link-off',
  pencil: 'pencil',
};

export default () => {
  map(mdiIcons, (icon, key) =>
    Jodit.modules.Icon.set(
      key,
      `<i class="mdi-${icon} mdi v-icon v-icon--size-default"></i>`,
    ),
  );
  Jodit.modules.Icon.set(
    'brush',
    `<span class="icon stack">
        <span class="icon stacked mdi mdi-format-color-text"></span>
        <span class="icon stacked mdi mdi-color-helper"></span>
        <svg width="0" height="0" style="display: none;"></svg>
      </span>
    `,
  );
};

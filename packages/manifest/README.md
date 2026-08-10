# @tailor-cms/ce-jodit-html-manifest

Shared element definition for the **Jodit HTML** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Declares the element type, display name, UI configuration and initial state. The authoring, end-user and server packages all build on it, so it is the only package that has to be understood to know what the element *is*.

## Installation

```sh
npm install @tailor-cms/ce-jodit-html-manifest
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import manifest, { type ElementData } from '@tailor-cms/ce-jodit-html-manifest';

manifest.type;       // 'JODIT_HTML'
manifest.initState(); // initial element data
```

## Element

| Property | Value |
| --- | --- |
| Name | Jodit HTML |
| Type | `JODIT_HTML` |
| Icon | [`mdi-text-box-outline`](https://pictogrammers.com/library/mdi/) |
| Composite | No |

## Packages

This element ships as four packages, published together from the
[`ce-jodit-html`](https://github.com/tailor-cms/ce-jodit-html) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-jodit-html-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-jodit-html-manifest) | Shared element definition |
| [`@tailor-cms/ce-jodit-html-edit`](https://www.npmjs.com/package/@tailor-cms/ce-jodit-html-edit) | Authoring component |
| [`@tailor-cms/ce-jodit-html-display`](https://www.npmjs.com/package/@tailor-cms/ce-jodit-html-display) | End-user component |
| [`@tailor-cms/ce-jodit-html-server`](https://www.npmjs.com/package/@tailor-cms/ce-jodit-html-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.

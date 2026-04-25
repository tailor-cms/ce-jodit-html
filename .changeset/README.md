# Changesets

This folder is managed by [`@changesets/cli`](https://github.com/changesets/changesets).

## How this element uses changesets

All four subpackages (`display`, `edit`, `manifest`, `server`) are released in
**lockstep** — they always share the same version. This is enforced via the
`fixed` group in `config.json`.

Per-package CHANGELOG generation is **disabled** (`"changelog": false`).
Release notes live in the **root `CHANGELOG.md`** and are curated by hand for
narrative clarity.

## Typical release flow

1. Add a changeset describing the change (you will be prompted for bump level
   and a one-line summary):

   ```sh
   pnpm exec changeset
   ```

2. When ready to release, apply versions and drop the changeset files:

   ```sh
   pnpm exec changeset version
   ```

   This bumps all four subpackages to the same version. The root `package.json`
   is `"private": true` and is untouched.

3. Update the root `CHANGELOG.md` with a human-written entry for the new
   version.

4. Build and publish to npm:

   ```sh
   pnpm build && pnpm exec changeset publish
   ```

   The build step is required because `changeset publish` does not build the
   subpackages; it only runs `npm publish` against each one, which expects the
   `dist/` folder (per each subpackage's `"files"` field) to already exist.

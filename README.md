# Jodit HTML

Rich text content element powered by the Jodit editor.

**Type:** `JODIT_HTML`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `content` | `string` | HTML content authored via Jodit |

## Edit

- Inline Jodit WYSIWYG editor activated on focus
- Debounced autosave and save-on-blur
- Toolbar rendered into a dedicated top toolbar slot

## Display

- Renders sanitized HTML content with element-scoped typography styles

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```

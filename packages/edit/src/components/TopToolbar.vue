<template>
  <div :id="toolbarId"></div>
</template>

<script lang="ts" setup>
import { toolbarId } from './config.ts';
</script>

<style scoped></style>

<style lang="scss">
// Theme colors and state overlays match Vuetify text buttons (TipTap toolbar)
$icon-color: rgb(var(--v-theme-on-surface));
$hover-background: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
$active-background: rgba(var(--v-theme-on-surface), var(--v-activated-opacity));
// Matches the TipTap (ce-html) toolbar: 30px buttons with 20px icons
$icon-size: 20px;
$text-size: 14px;
$button-size: 30px;
$button-radius: 6px;

#joditToolbar {
  width: unset !important;
}

.jodit-toolbar-editor-collection {
  margin: 0 !important;
  box-shadow: none;
  border: none;
  padding: 0 !important;
  background: none !important;
  font-size: $text-size;
  line-height: $text-size;
  text-align: initial;

  .jodit-ui-group {
    .jodit-ui-separator {
      align-self: stretch;
      width: 1px;
      margin: 0.25rem 0.125rem 0.25rem 0.25rem;
      border: none;
      background: rgba(var(--v-border-color), var(--v-border-opacity));
    }

    .jodit-toolbar-button {
      height: $button-size;
      min-width: $button-size;
      border: none;
      line-height: normal;

      &:focus {
        outline: none;
      }

      button {
        height: 100%;
        min-width: $button-size;
      }

      .jodit-toolbar-button__text {
        font-size: $text-size;
      }

      .jodit-icon {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        font-size: $icon-size;
        line-height: $icon-size;
        vertical-align: top;

        &.stack {
          position: relative;
        }

        .stacked {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 100%;
          text-align: center;
        }
      }
    }
  }
}

.jodit-toolbar-editor-collection .jodit-toolbar-button {
  .jodit-icon {
    color: inherit !important;

    .mdi {
      color: $icon-color;
    }

    .mdi-color-helper {
      color: inherit !important;
    }
  }

  @mixin colorize($color, $background: none) {
    background: $background;
    color: $color;

    & > button {
      background: transparent;
      color: inherit;
    }

    // dropdown chevrons
    .jodit-toolbar-button__trigger svg {
      fill: currentcolor;
    }
  }

  transition:
    all 0.2s linear,
    opacity 0.1s linear;

  // Dropdowns: icon + compact chevron, ~42px wide like the TipTap toolbar
  &_with-trigger_true {
    border: none;
    padding: 0 2px;

    & > button {
      min-width: 24px !important;
      padding: 0 2px;
    }

    .jodit-toolbar-button__trigger {
      width: 14px;
      margin: 0;
      opacity: 1;
      background: none;

      svg {
        fill: currentcolor;
      }
    }
  }

  &:active {
    &:not([disabled]) {
      @include colorize($color: $icon-color, $background: $active-background);
    }
  }

  &:hover {
    &:not([disabled]) {
      background-color: transparent;

      @include colorize($color: $icon-color, $background: $hover-background);
    }
  }

  &[aria-pressed='true'] {
    &:not([disabled]) {
      @include colorize($color: $icon-color, $background: $active-background);
    }
  }

  &.popup_open,
  &.popup_open:hover {
    @include colorize($color: $icon-color, $background: $active-background);
  }

  &.jodit-toolbar-button-separator {
    min-width: 0;
  }

  & > a .jodit-with_dropdownlist-trigger {
    vertical-align: top;
  }

  .picker_label {
    display: inline-block;
    height: $icon-size;
    line-height: $icon-size;

    .mdi {
      display: none;
    }
  }
}

.jodit-toolbar-editor-collection_list > .jodit-toolbar-editor-collection {
  &,
  & .jodit-toolbar-editor-collection {
    box-shadow: rgb(0 0 0 / 20%) 0 2px 8px;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding: 0 !important;
    background: rgb(var(--v-theme-surface));
    color: $icon-color;
  }

  .jodit-toolbar-button > button {
    padding: 8px 16px;

    .jodit-toolbar-button-left & {
      padding: 8px 12px;
    }
  }
}

.jodit-color-picker .btn_reset_color {
  width: auto;

  &:active,
  &:hover {
    background: $hover-background;
    color: $icon-color;
  }

  span {
    float: none;
  }

  & > span {
    display: inline-block;
    height: $icon-size;
    line-height: $icon-size;

    &:focus {
      outline: none;
    }

    span.jodit-icon {
      color: inherit;
    }
  }
}

.jodit-color-picker .selected_color_marker {
  &::before {
    display: none;
  }
  /* stylelint-disable-next-line  */
  svg {
    display: none;
  }
}

.jodit-toolbar-editor-collection_popup {
  margin-top: 6px;
}

.jodit-toolbar-button {
  border-radius: $button-radius !important;
}

// Matches the Vuetify tooltip used by the TipTap toolbar
.jodit-ui-tooltip {
  background-color: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-on-surface-variant));
}
</style>

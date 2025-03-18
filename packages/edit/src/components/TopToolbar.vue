<template>
  <div :id="toolbarId"></div>
</template>

<script lang="ts" setup>
import { toolbarId } from './config.ts';
</script>

<style scoped></style>

<style lang="scss">
$icon-color: #333;
$icon-accent-color: #607d8b;
$icon-size: 24px;
$text-size: 16px;

.jodit-toolbar-editor-collection_container {
  min-height: 72px;
}

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
    .jodit-toolbar-button {
      min-width: 30px;
      line-height: normal;

      &:focus {
        outline: none;
      }

      button {
        height: 2rem;
        min-width: 2rem;
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

  &_with-trigger_true {
    border: none;
    padding: 0 5px;

    .jodit-toolbar-button__trigger {
      opacity: 1;
      background: none;

      svg {
        fill: currentcolor;
      }
    }
  }

  &:active {
    &:not([disabled]) {
      @include colorize(
        $color: $icon-accent-color,
        $background: rgba($icon-accent-color, 0.12)
      );
    }
  }

  &:hover {
    &:not([disabled]) {
      background-color: transparent;

      @include colorize(
        $color: $icon-color,
        $background: rgba($icon-color, 0.08)
      );
    }
  }

  &[aria-pressed='true'] {
    &:not([disabled]) {
      @include colorize(
        $color: $icon-accent-color,
        $background: rgba($icon-accent-color, 0.12)
      );
    }
  }

  &.popup_open,
  &.popup_open:hover {
    @include colorize($color: #c3c3c3);
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
    border: 1px solid #ccc;
    padding: 0 !important;
    background: #fff;
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
    background: none;
    color: $icon-accent-color;
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
  border-radius: 8px !important;
}
</style>

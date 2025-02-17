import type { HookServices, ServerRuntime } from '@tailor-cms/cek-common';
import { initState, type } from '@tailor-cms/ce-jodit-html-manifest';
import type { Element } from '@tailor-cms/ce-jodit-html-manifest';

// Detect if hooks are running in CEK (used for mocking end-system runtime)
const IS_CEK = process.env.CEK_RUNTIME;
// Don't use in production, use only when IS_CEK=true
const USER_STATE: any = {};

/* eslint-disable @typescript-eslint/no-unused-vars */
export function beforeSave(element: Element, services: HookServices) {
  return element;
}

export function afterSave(element: Element, services: HookServices) {
  return element;
}

export function afterLoaded(
  element: Element,
  services: HookServices,
  runtime: ServerRuntime,
) {
  return element;
}

export function afterRetrieve(
  element: Element,
  services: HookServices,
  runtime: ServerRuntime,
) {
  return element;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function beforeDisplay(element: Element, context: any) {
  return { ...context, ...USER_STATE };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function onUserInteraction(
  element: Element,
  context: any,
  payload: any,
): any {
  // Simulate user state update within CEK
  if (IS_CEK) {
    // Only for showcase purposes
    USER_STATE.interactionTimestamp = new Date().getTime();
    // Can be reset to initial / mocked state via UI
    context.contextTimestamp = USER_STATE.interactionTimestamp;
    Object.assign(USER_STATE, payload);
  }
  // Can have arbitrary return value (interpreted by target system)
  // FE is updated if updateDisplayState is true
  return { updateDisplayState: true };
}

export const hookMap = new Map(
  Object.entries({
    beforeSave,
    afterSave,
    afterLoaded,
    afterRetrieve,
    onUserInteraction,
    beforeDisplay,
  }),
);

export default {
  type,
  hookMap,
  initState,
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
  onUserInteraction,
  beforeDisplay,
};

export { type, initState };

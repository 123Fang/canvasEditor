import Editor from '@canvaseditor/core';
interface Selector {
  mSelectMode: SelectMode;
  mSelectOneType: string | undefined;
  mSelectId: string | undefined;
  mSelectIds: (string | undefined)[];
  mSelectActive: unknown[];
}

export default function useSelect() {
  const fabric = inject('fabric');
  const canvasEditor = inject('canvasEditor') as Editor;
  const mixinState = inject('mixinState') as Selector;

  return {
    fabric,
    canvasEditor,
    mixinState,
  };
}

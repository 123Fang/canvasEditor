import { cloneDeep } from 'lodash-es';
import { fabric } from 'fabric';
import Editor from '../Editor';

enum POSITION {
  lt = 'Left_Top',
  lb = 'Left_Right',
  rt = 'Right_Top',
  rb = 'Right_Bottom',
  full = 'Full',
}
type IEditor = Editor;


class WaterMarkPlugin {
  public canvas: fabric.Canvas;
  public editor: IEditor;
  constructor(canvas: fabric.Canvas, editor: IEditor) {
    this.canvas = canvas;
    this.editor = editor;
    this.init();
  }
  init() {
    console.log('init-------init')
  }
};

export default WaterMarkPlugin;

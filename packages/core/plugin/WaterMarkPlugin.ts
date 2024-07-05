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
type IPosition = POSITION.lt | POSITION.lb | POSITION.rt | POSITION.rb | POSITION.full; // lt 左上 lr 左上 rt 右上  rb 右下 full 平铺 后续可扩展其他功能
type IDrawOps = {
  text: string;
  size: number;
  fontFamily: string;
  color: string;
  isRotate: boolean;
  position: IPosition;
};

const defaultOptions: IDrawOps = {
  text: '',
  size: 24,
  isRotate: false, // 是否倾斜
  fontFamily: '汉体', // 可考虑自定义字体
  color: '#ccc', // 可考虑自定义颜色
  position: POSITION.lt,
};

class WaterMarkPlugin {
  constructor(){}
};

export default WaterMarkPlugin;

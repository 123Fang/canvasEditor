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
  public canvas: fabric.Canvas;
  public editor: IEditor;
  private drawOps: IDrawOps = defaultOptions;
  private hadDraw = false;
  constructor(canvas: fabric.Canvas, editor: IEditor) {
    this.canvas = canvas;
    this.editor = editor;
    this.init();
  }
  init() {
    console.log('init-------init')
    this.editor.on('sizeChange', this.drawWaterMark.bind(this));
  }

  private createCanvas(width: number, height: number) {
    const waterCanvas: HTMLCanvasElement = document.createElement('canvas');
    waterCanvas.width = width;
    waterCanvas.height = height;
    waterCanvas.style.position = 'fixed';
    waterCanvas.style.opacity = '0';
    waterCanvas.style.zIndex = '-1';
    return waterCanvas;
  }

  private drawing: Record<IPosition, (...arg: any[]) => void> = {
    [POSITION.lt]: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = this.createCanvas(width, height);
      const w = waterCanvas.width || width;
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      ctx.fillStyle = this.drawOps.color;
      ctx.font = `${this.drawOps.size}px ${this.drawOps.fontFamily}`;
      ctx.fillText(this.drawOps.text, 10, this.drawOps.size + 10, w - 20);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;

    },
    [POSITION.rt]: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = this.createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      ctx.fillStyle = this.drawOps.color;
      ctx.font = `${this.drawOps.size}px ${this.drawOps.fontFamily}`;
      ctx.fillText(
        this.drawOps.text,
        w - ctx.measureText(this.drawOps.text).width - 20,
        this.drawOps.size + 10,
        w - 20
      );
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },

    [POSITION.lb]: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = this.createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      const h = waterCanvas.height || height;
      ctx.fillStyle = this.drawOps.color;
      ctx.font = `${this.drawOps.size}px ${this.drawOps.fontFamily}`;
      ctx.fillText(this.drawOps.text, 10, h - this.drawOps.size, w - 20);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },

    [POSITION.rb]: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = this.createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      ctx.fillStyle = this.drawOps.color;
      ctx.font = `${this.drawOps.size}px ${this.drawOps.fontFamily}`;
      ctx.fillText(
        this.drawOps.text,
        w - ctx.measureText(this.drawOps.text).width - 20,
        height - this.drawOps.size,
        width - 20
      );
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    
    },
    
    [POSITION.full]: (width: number, height: number, cb: (imgString: string) => void) => { 
      const angle = -30; // 按逆时针30度算
      const R = (angle * Math.PI) / 180;
      const font = `${this.drawOps.size}px ${this.drawOps.fontFamily}`;
      let waterCanvas: HTMLCanvasElement | null = this.createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      ctx.font = font;
      const textW = ctx.measureText(this.drawOps.text).width + 40;
      let patternCanvas: HTMLCanvasElement | null = this.createCanvas(
        this.drawOps.isRotate ? textW * Math.abs(Math.cos(R)) + this.drawOps.size : textW,
        this.drawOps.isRotate
          ? textW * Math.abs(Math.sin(R)) + this.drawOps.size
          : this.drawOps.size + 20
      );
      document.body.appendChild(patternCanvas);
      let ctxWater: CanvasRenderingContext2D | null = patternCanvas.getContext('2d')!;
      ctxWater.textAlign = 'left';
      ctxWater.textBaseline = 'top';
      ctxWater.font = font;
      ctxWater.fillStyle = `${this.drawOps.color}`;
      if (this.drawOps.isRotate) {
        ctxWater.translate(0, textW * Math.abs(Math.sin(R)));
        ctxWater.rotate(R);
        ctxWater.fillText(this.drawOps.text, 0, 0);
      } else {
        ctxWater.fillText(this.drawOps.text, 10, 10);
      }
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat')!;
      ctx.fillRect(0, 0, width, height);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      patternCanvas = null;
      ctx = null;
      ctxWater = null;
    
    }
    
  };
  drawWaterMark(ops: IDrawOps) {
    this.drawOps = Object.assign(cloneDeep(this.drawOps), ops);
    if (!this.drawOps.text) return;
    const workspace = this.canvas.getObjects().find((item: any) => item.id === 'workspace');
    const { width, height, left, top }: any = workspace;

    this.drawing[this.drawOps?.position](width, height, (imgString: string) => {
      this.canvas.overlayImage = undefined;
      this.hadDraw = true;
      this.canvas.setOverlayImage(imgString, this.canvas.renderAll.bind(this.canvas), {
        left: left || 0,
        top: top || 0,
        originX: 'left',
        originY: 'top',
      });
    });


    
    console.log(width, height, left, top)
  }
};

export default WaterMarkPlugin;

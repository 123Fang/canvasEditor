import Editor from '../Editor';
import { fabric } from 'fabric';
import { drawImg } from '../utils/utils';
import edgeImg from '../assets/edgecontrol.svg';
import { noop } from 'lodash-es';

type IEditor = Editor;

export type Options = {
  fill: string;
  style: fabric.IObjectOptions['cornerStyle'];
};

interface PointIndexPolygon extends fabric.Polygon {
  pointIndex: number;
  __corner: string;
  _setPositionDimensions: (...args: any[]) => any;
}

interface PointIndexControl extends fabric.Control {
  pointIndex: number;
}

const actionHandler: fabric.Control['actionHandler'] = function (
  eventData: MouseEvent,
  transform: fabric.Transform,
  x: number,
  y: number
) {
  
};
const anchorWrapper = function (anchorIndex: number, fn: fabric.Control['actionHandler']) {
 
};
const getObjectSizeWithStroke = function (object: fabric.Object) {
};
const polygonPositionHandler = function (
  this: PointIndexControl,
  dim: any,
  finalMatrix: any,
  fabricObject: any
) {
  
};
function renderIconEdge(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  styleOverride: any,
  fabricObject: fabric.Object
) {
  const img = document.createElement('img');
  img.src = edgeImg;
  drawImg(ctx, left, top, img, 25, 25, fabric.util.degreesToRadians(fabricObject.angle || 0));
}

class PolygonModifyPlugin {
 
}

export default PolygonModifyPlugin;

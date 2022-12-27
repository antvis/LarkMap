import type { DrawType } from '../types';
import { DrawGroupData } from '../use-draw-group/types';

export const CLS_PREFIX = 'larkmap-draw-modal';

export const DRAW_ICON_TYPE_MAP: Record<DrawType, string> = {
  point: 'l7draw-point',
  line: 'l7draw-line',
  polygon: 'l7draw-polygon',
  rect: 'l7draw-rect',
  circle: 'l7draw-circle',
};

export const DRAW_TEXT_TYPE_MAP: Record<DrawType, string> = {
  point: '绘制点',
  line: '绘制线',
  polygon: '绘制面',
  rect: '绘制矩形',
  circle: '绘制圆',
};

export const DEFAULT_DRAW_DATA: DrawGroupData = {
  circle: [],
  line: [],
  point: [],
  polygon: [],
  rect: [],
};

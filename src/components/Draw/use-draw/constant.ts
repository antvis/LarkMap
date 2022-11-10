import { DrawCircle, DrawLine, DrawPoint, DrawPolygon, DrawRect } from '@antv/l7-draw';
import type { DrawType } from '../types';

export const DRAW_TYPE_MAP: Record<DrawType, any> = {
  point: DrawPoint,
  line: DrawLine,
  polygon: DrawPolygon,
  rect: DrawRect,
  circle: DrawCircle,
};

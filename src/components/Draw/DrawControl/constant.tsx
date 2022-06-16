import { CircleDrawer, LineDrawer, PointDrawer, PolygonDrawer, RectDrawer } from '@antv/l7-draw';
import React from 'react';
import type {
  DrawCircleConfig,
  DrawClearConfig,
  DrawConfig,
  DrawLineConfig,
  DrawPointConfig,
  DrawPolygonConfig,
  DrawRectConfig,
  DrawType,
} from './types';

export const CLS_PREFIX = 'larkmap-draw-control';

export const DRAW_TYPES: DrawType[] = ['point', 'line', 'polygon', 'rect', 'circle'];

export const Icon = ({ type }: { type: string }) => {
  return (
    <svg className="l7draw-icon" aria-hidden="true">
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export const DEFAULT_POINT_CONFIG: DrawPointConfig = {
  icon: () => <Icon type="l7draw-point" />,
  options: {},
};

export const DEFAULT_LINE_CONFIG: DrawLineConfig = {
  icon: () => <Icon type="l7draw-line" />,
  options: {},
};

export const DEFAULT_POLYGON_CONFIG: DrawPolygonConfig = {
  icon: () => <Icon type="l7draw-polygon" />,
  options: {},
};

export const DEFAULT_RECT_CONFIG: DrawRectConfig = {
  icon: () => <Icon type="l7draw-rect" />,
  options: {},
};

export const DEFAULT_CIRCLE_CONFIG: DrawCircleConfig = {
  icon: () => <Icon type="l7draw-circle" />,
  options: {},
};

export const DEFAULT_CLEAR_CONFIG: DrawClearConfig = {
  icon: () => <Icon type="l7draw-clear" />,
};

export const DEFAULT_DRAW_CONFIG: DrawConfig = {
  point: DEFAULT_POINT_CONFIG,
  line: DEFAULT_LINE_CONFIG,
  polygon: DEFAULT_POLYGON_CONFIG,
  rect: DEFAULT_RECT_CONFIG,
  circle: DEFAULT_CIRCLE_CONFIG,
  clear: DEFAULT_CLEAR_CONFIG,
};

export const DRAW_MAP: Record<DrawType, any> = {
  point: PointDrawer,
  line: LineDrawer,
  polygon: PolygonDrawer,
  rect: RectDrawer,
  circle: CircleDrawer,
};

import { DrawCircle, DrawLine, DrawPoint, DrawPolygon, DrawRect } from '@antv/l7-draw';
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
  title: '绘制点',
  options: {},
};

export const DEFAULT_LINE_CONFIG: DrawLineConfig = {
  icon: () => <Icon type="l7draw-line" />,
  title: '绘制线',
  options: {},
};

export const DEFAULT_POLYGON_CONFIG: DrawPolygonConfig = {
  icon: () => <Icon type="l7draw-polygon" />,
  title: '绘制面',
  options: {},
};

export const DEFAULT_RECT_CONFIG: DrawRectConfig = {
  icon: () => <Icon type="l7draw-rect" />,
  title: '绘制矩形',
  options: {},
};

export const DEFAULT_CIRCLE_CONFIG: DrawCircleConfig = {
  icon: () => <Icon type="l7draw-circle" />,
  title: '绘制圆',
  options: {},
};

export const DEFAULT_CLEAR_CONFIG: DrawClearConfig = {
  icon: () => <Icon type="l7draw-qingkong" />,
  title: '清空',
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
  point: DrawPoint,
  line: DrawLine,
  polygon: DrawPolygon,
  rect: DrawRect,
  circle: DrawCircle,
};

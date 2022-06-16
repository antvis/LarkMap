import type {
  BaseMode,
  IBaseModeOptions,
  ICircleDrawerOptions,
  ILineDrawerOptions,
  IPointDrawerOptions,
  IPolygonDrawerOptions,
  IRectDrawerOptions,
} from '@antv/l7-draw';
import type React from 'react';
import type { CustomControlProps } from '../../CustomControl';

export type DrawType = 'point' | 'line' | 'polygon' | 'rect' | 'circle';

export type DrawItemConfig<O extends Partial<IBaseModeOptions>> = {
  icon?: React.FC<{ isActive: boolean }>;
  options?: O;
};

export type DrawPointConfig = DrawItemConfig<Partial<IPointDrawerOptions>>;
export type DrawLineConfig = DrawItemConfig<Partial<ILineDrawerOptions>>;
export type DrawPolygonConfig = DrawItemConfig<Partial<IPolygonDrawerOptions>>;
export type DrawRectConfig = DrawItemConfig<Partial<IRectDrawerOptions>>;
export type DrawCircleConfig = DrawItemConfig<Partial<ICircleDrawerOptions>>;
export type DrawClearConfig = {
  icon?: React.FC;
};

export type DrawConfig = {
  point: DrawPointConfig | boolean;
  line: DrawLineConfig | boolean;
  polygon: DrawPolygonConfig | boolean;
  rect: DrawRectConfig | boolean;
  circle: DrawCircleConfig | boolean;
  clear: DrawClearConfig | boolean;
};

/**
 * 组件类型定义
 */
export interface DrawControlProps extends Pick<CustomControlProps, 'position'> {
  config: DrawConfig;
  vertical: boolean;
}

export type DrawData = Record<DrawType, any[]>;

export type DrawItem = {
  draw: BaseMode<any>;
  icon: React.FC<{ isActive: boolean }>;
};

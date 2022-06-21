import type {
  BaseMode,
  IBaseModeOptions,
  ICircleDrawerOptions,
  ILineDrawerOptions,
  IPointDrawerOptions,
  IPolygonDrawerOptions,
  IRectDrawerOptions,
  IStyle,
} from '@antv/l7-draw';
import type React from 'react';
import type { CSSProperties } from 'react';
import type { CustomControlProps } from '../../CustomControl';

export type DrawType = 'point' | 'line' | 'polygon' | 'rect' | 'circle';
/**
 * 赋予参数对象T深度可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DrawItemConfig<O extends DeepPartial<IBaseModeOptions> = DeepPartial<IBaseModeOptions>> = {
  icon?: React.FC<{ isActive: boolean }>;
  title?: string;
  options?: O;
};

export type DrawPointConfig = DrawItemConfig<DeepPartial<IPointDrawerOptions>>;
export type DrawLineConfig = DrawItemConfig<DeepPartial<ILineDrawerOptions>>;
export type DrawPolygonConfig = DrawItemConfig<DeepPartial<IPolygonDrawerOptions>>;
export type DrawRectConfig = DrawItemConfig<DeepPartial<IRectDrawerOptions>>;
export type DrawCircleConfig = DrawItemConfig<DeepPartial<ICircleDrawerOptions>>;
export type DrawClearConfig = DrawItemConfig<undefined>;

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
  data?: Partial<DrawData>;
  onChange?: (value: Partial<DrawData>) => void;
  config?: DrawConfig;
  vertical?: boolean;
  drawStyle?: IStyle;
  editable?: boolean;
  autoFocus?: boolean;
  addMultiple?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** Control 条自定义class名称 */
  className?: string;
  /** Control 条内敛样式 */
  style?: CSSProperties;
}

export type DrawData = Record<DrawType, any[]>;

export type ControlItem = {
  draw?: BaseMode<any>;
  type: DrawType | string;
} & Pick<DrawItemConfig, 'icon' | 'title'>;

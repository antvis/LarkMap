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
import type { CustomControlProps } from '../../CustomControl/types';

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
  point?: DrawPointConfig | boolean;
  line?: DrawLineConfig | boolean;
  polygon?: DrawPolygonConfig | boolean;
  rect?: DrawRectConfig | boolean;
  circle?: DrawCircleConfig | boolean;
  clear?: DrawClearConfig | boolean;
};

/**
 * 组件类型定义
 */
export interface DrawControlProps extends Pick<CustomControlProps, 'position' | 'className' | 'style'> {
  data?: DrawData;
  config?: DrawConfig;
  defaultActiveType?: DrawType;
  vertical?: boolean;
  drawStyle?: DeepPartial<IStyle>;
  editable?: boolean;
  autoFocus?: boolean;
  addMultiple?: boolean;
  multiple?: boolean;
  disableEditable?: boolean;
  onChange?: (value: DrawData) => void;
  onDrawChange?: (draw: BaseMode | null) => void;
}

export type DrawData = Partial<Record<DrawType, any[]>>;

export type ControlItem = {
  draw?: BaseMode<any>;
  type: DrawType | string;
} & Pick<DrawItemConfig, 'icon' | 'title'>;

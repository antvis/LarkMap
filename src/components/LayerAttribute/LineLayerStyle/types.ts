import type { LineLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';
import type { OptionsType } from '../types';

/**
 * 线图层样式属性值
 */
export type LineLayerStyleAttributeValue = Omit<LineLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface LineLayerStyleAttributeProps extends CommonProps {
  /**
   * 传入配置项
   */
  options: OptionsType;
  /**
   * 初始值
   */
  initialValues: LineLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: LineLayerStyleAttributeValue) => void;
}

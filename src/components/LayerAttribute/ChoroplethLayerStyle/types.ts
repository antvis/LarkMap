import type { ChoroplethLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';
import type { OptionsType } from '../types';

/**
 * 区域图层样式属性值
 */
export type ChoroplethLayerStyleAttributeValue = Omit<ChoroplethLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface ChoroplethLayerStyleAttributeProps extends CommonProps {
  /**
   * 传入配置项
   */
  options: OptionsType;
  /**
   * 初始值
   */
  initialValues: ChoroplethLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: ChoroplethLayerStyleAttributeValue) => void;
}

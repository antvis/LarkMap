import type { LineLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';
import type { FieldSelectOptionType } from '../types';

/**
 * 线图层样式属性值
 */
export type LineLayerStyleAttributeValue = Omit<LineLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface LineLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldSelectOptionType[];
  /**
   * 色带配置
   */
  ribbonList?: string[][];
  /**
   * 初始值
   */
  initialValues: LineLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: LineLayerStyleAttributeValue) => void;
}

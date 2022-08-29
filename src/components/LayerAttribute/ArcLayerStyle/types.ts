import type { LineLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';
import type { FieldSelectOptionType } from '../types';

/**
 * 区域图层样式属性值
 */
export type ArcLayerStyleAttributeValue = Omit<LineLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface ArcLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldSelectOptionType[];
  /**
   * 初始值
   */
  initialValues: ArcLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: ArcLayerStyleAttributeValue) => void;
}

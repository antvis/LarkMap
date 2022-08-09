import type { HeatmapLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';
import type { FieldItem, ShapeItem } from '../types';

/**
 * 区域图层样式属性值
 */
export type HeatmapLayerStyleAttributeValue = Omit<HeatmapLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface HeatmapLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldItem[];
  /**
   * 视图字段
   */
  shapeList: ShapeItem[];
  /**
   * 初始值
   */
  initialValues?: HeatmapLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: HeatmapLayerStyleAttributeValue) => void;
}
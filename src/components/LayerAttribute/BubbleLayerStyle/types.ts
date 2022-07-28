import type { BubbleLayerOptions } from '@antv/l7-composite-layers';
import type { CommonProps } from '../../../types/common';

export type FieldItem = {
  value: string;
  lable: string;
  type?: string;
};

/**
 * 气泡图层样式
 */
export type BubbleLayerStyle = Omit<BubbleLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface BubbleLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldItem[];
  /**
   * 初始值
   */
  initialValues: BubbleLayerStyle;
  /**
   * 属性表单发生改变件
   */
  onChange?: (values: BubbleLayerStyle) => void;
}

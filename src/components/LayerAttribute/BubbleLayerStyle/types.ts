import type { CommonProps } from '../../../types/common';

export type FieldItem = {
  value: string;
  lable: string;
  type?: string;
};

/**
 * 组件类型定义
 */
export interface BubbleLayerStyleAttributeProps extends CommonProps {
  fieldList: FieldItem[];
  initialValues: Record<string, any>;
}

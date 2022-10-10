import type { CommonProps } from '../../../types/common';

export interface LegendProportionProp extends CommonProps {
  /**图例项名称 */
  labels: number[];
  /**
   * 填充颜色
   * @default "#f9f9f9"
   */
  fillColor?: string;
}

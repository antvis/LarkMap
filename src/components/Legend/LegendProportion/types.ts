import type { CommonProps } from './../../../types/common';

export interface LegendProportionProp extends CommonProps {
  /**标题 */
  labels: number[];
  /**填充颜色 */
  fillColor?: string;
}

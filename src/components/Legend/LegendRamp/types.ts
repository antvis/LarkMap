import type { CommonProps } from './../../../types/common';

export interface LegendRampProps extends CommonProps {
  /**标题 */
  labels: string[] | number[];
  /**单位 */
  lableUnit: string;
  /**颜色列表 */
  colors: { startColor: string; endColor: string } | string[];
  /**是否连续 */
  isContinuous?: boolean;
  /**
   * bar宽度
   */
  barWidth?: number;
}

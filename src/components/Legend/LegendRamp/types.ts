import type { CommonProps } from '../../../types/common';

export interface LegendRampProps extends CommonProps {
  /** 图例项名称 */
  labels: string[] | number[];
  /**
   * 图例项单位
   * @default ""
   */
  labelUnit?: string;
  /**图例项颜色 */
  colors: string[];
  /**
   * 是否连续
   * @default false
   */
  isContinuous?: boolean;
}

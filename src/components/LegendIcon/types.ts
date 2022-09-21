import type { CommonProps } from '../../types/common';

export interface LegendIconProps extends CommonProps {
  /** 图例项名称 */
  labels: string[];
  /** 图例项图标 */
  icons: string[];
}

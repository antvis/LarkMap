import type { CommonProps } from '../../../types/common';

export type IconType = string | React.ReactElement;

export interface LegendIconProps extends CommonProps {
  /** 图例项名称 */
  labels: string[];
  /** 图例项图标 */
  icons: IconType[];
}

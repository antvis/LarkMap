import type { CommonProps } from '../../../types/common';

export interface LegendCategoriesProps extends CommonProps {
  /**
   * 图形形状
   *  @default "circle"
   */
  geometryType?: 'circle' | 'square';
  /** 图例项名称 */
  labels: string[];
  /** 图例项颜色 */
  colors: string[] | { startColor: string; endColor: string };
  /**
   * 是否颜色填充
   * @default false
   */
  isStrokeColor?: boolean;
}

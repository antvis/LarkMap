import type { CommonProps } from './../../../types/common';

export interface LegendCategoriesProps extends CommonProps {
  /** 图形形状 */
  geometryType?: 'circle' | 'square';
  /** 标题列表 */
  labels: string[];
  /** 颜色列表 */
  colors: string[] | { startColor: string; endColor: string };
  /**
   * 是否颜色填充
   */
  isStrokeColor?: boolean;
}

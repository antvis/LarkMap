import type { IControlOption, PositionName } from '@antv/l7';
import type { CommonProps } from 'types/common';

/**
 * 组件类型定义
 */

export interface CustomControlProps extends CommonProps, Partial<IControlOption> {
  /** 名称 */
  name?: string;
  /** 位置 */
  position?: PositionName;
  children?: React.ReactNode;
}

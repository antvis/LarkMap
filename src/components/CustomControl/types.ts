import type { IControlOption } from '@antv/l7';
import type { CommonProps } from '../../types/common';

/**
 * 组件类型定义
 */

export interface CustomControlProps extends CommonProps, Partial<IControlOption> {
  /** 名称 */
  name?: string;
  /** 位置 */
  position?:
    | 'topright'
    | 'topleft'
    | 'bottomright'
    | 'bottomleft'
    | 'topcenter'
    | 'bottomcenter'
    | 'leftcenter'
    | 'rightcenter';
  /** 子组件 */
  children?: React.ReactNode;
}

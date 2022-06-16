import type { IControlOption, PositionName } from '@antv/l7';
import type { CommonProps } from '../../types/common';

/**
 * 组件类型定义
 */

export interface CustomControlProps extends CommonProps, Partial<IControlOption> {
  /** 名称 */
  name?: string;
  /** 位置，支持 'topright'、'topleft'、'bottomright'、'bottomleft'、'topcenter'、'bottomcenter'、'leftcenter'、'rightcenter'
   * @default "topleft"
   */
  position?: PositionName;
  /** 子组件 */
  children?: React.ReactNode;
}

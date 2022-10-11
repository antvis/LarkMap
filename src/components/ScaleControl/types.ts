import type { IScaleControlOption, PositionName } from '@antv/l7';

/**
 * 组件类型定义
 */
export interface ScaleControlProps extends Partial<Omit<IScaleControlOption, 'name'>> {
  /** 位置，支持 'topright'、'topleft'、'bottomright'、'bottomleft'、'topcenter'、'bottomcenter'、'leftcenter'、'rightcenter'
   * @default "bottomleft"
   */
  position?: PositionName;
}

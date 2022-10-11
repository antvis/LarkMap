import type { IZoomControlOption, PositionName } from '@antv/l7';

/**
 * 组件类型定义
 */
export interface ZoomControlProps extends Partial<Omit<IZoomControlOption, 'name'>> {
  /** 位置，支持 'topright'、'topleft'、'bottomright'、'bottomleft'、'topcenter'、'bottomcenter'、'leftcenter'、'rightcenter'
   * @default "topleft"
   */
  position?: PositionName;
}

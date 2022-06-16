import type { PositionName } from '@antv/l7';
import type { IZoomControlOption } from '@antv/l7-component/es/control/zoom';

/**
 * 组件类型定义
 */
export interface ZoomProps extends Partial<Omit<IZoomControlOption, 'name'>> {
  /** 位置，支持 'topright'、'topleft'、'bottomright'、'bottomleft'、'topcenter'、'bottomcenter'、'leftcenter'、'rightcenter'
   * @default "topleft"
   */
  position?: PositionName;
}

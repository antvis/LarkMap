import type { PositionName } from '@antv/l7';
import type { IScaleControlOption } from '@antv/l7-component/es/control/scale';

/**
 * 组件类型定义
 */
export interface ScaleProps extends Partial<Omit<IScaleControlOption, 'name'>> {
  /** 位置，支持 'topright'、'topleft'、'bottomright'、'bottomleft'、'topcenter'、'bottomcenter'、'leftcenter'、'rightcenter'
   * @default "bottomleft"
   */
  position?: PositionName;
}

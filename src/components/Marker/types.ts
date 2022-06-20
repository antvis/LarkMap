import type { ILngLat } from '@antv/l7';

/**
 * 锚点相对位置
 */
export type AnchorType =
  | 'right'
  | 'top-right'
  | 'left'
  | 'bottom-right'
  | 'left'
  | 'top-left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'center';

/**
 * 组件类型定义
 */
export interface MarkerProps {
  /** 锚点位置的经纬度 */
  lngLat: ILngLat;
  /** 锚点相对位置，支持 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
   * @default "center"
   */
  anchor?: AnchorType;
  /** 设置默认 marker 的颜色
   * @default "#5B8FF9"
   */
  color?: string;
  /** marker 是否可以拖动到地图上的新位置
   * @default false
   */
  draggable?: boolean;
  /** 偏移量 [0, 0] 分别表示 X, Y 的偏移量，单位为像素。
   * @default [0, 0]
   */
  offset?: [number, number];
  /** 用户自定义属性，支持任意数据类型，存储 marker 属性信息。*/
  extData?: Record<string, any>;
  /** 点击事件 */
  onClick?: (e: MouseEvent) => void;
  /** 子组件 */
  children?: React.ReactNode;
}

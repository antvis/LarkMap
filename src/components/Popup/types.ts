import type { ILngLat } from '@antv/l7';
import type { AnchorType } from '../Marker/types';

/**
 * 组件类型定义
 */
export interface PopupProps {
  /** 信息框位置的经纬度 */
  lngLat: ILngLat;
  /** 锚点相对位置，支持 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
   * @default "bottom"
   */
  anchor?: AnchorType;
  /** 偏移量 [0, 0] 分别表示 X, Y 的偏移量，单位为像素。
   * @default [0, 0]
   */
  offset?: [number, number];
  /** 是否显示关闭按钮
   * @default true
   */
  closeButton?: boolean;
  /** 是否在点击地图的时候关闭信息库
   * @default true
   */
  closeOnClick?: boolean;
  /** 信息框容器 CSS 类名 */
  className?: string;
  /**
   * 设置信息框容器最大宽度，设置为 'none' 代表没有设置宽度
   * @default "240px"
   */
  maxWidth?: string;
  /** 打开信息框事件 */
  onOpen?: () => void;
  /** 关闭信息框事件 */
  onClose?: () => void;
  /** 子组件 */
  children?: React.ReactNode;
}

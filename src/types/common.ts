import type { CSSProperties } from 'react';

export type CommonProps = {
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
};

export interface LayerCommonProps<T> {
  /** 图层初始化完成后回调，用于获取 layer 对象   */
  onCreated?: (layer: T) => void;
}

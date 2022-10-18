import type { IMouseLocationControlOption, MouseLocation } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
// @ts-ignore
export interface MouseLocationControlProps
  extends Partial<IMouseLocationControlOption>,
    IControlCallback<MouseLocation> {
  style?: CSSProperties;
  onLocationChange?: (position: [number, number]) => void;
}

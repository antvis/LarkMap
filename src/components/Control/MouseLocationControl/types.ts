import type { IMouseLocationControlOption, MouseLocation } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface MouseLocationControlProps
  extends Omit<Partial<IMouseLocationControlOption>, 'style'>,
    IControlCallback<MouseLocation> {
  style?: CSSProperties;
  onLocationChange?: (position: [number, number]) => void;
}

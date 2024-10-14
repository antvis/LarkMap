import type { ISwipeControlOption, Zoom as L7Zoom } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback, Layer } from '../../../types';

export interface SwipeControlProps
  extends Omit<Partial<ISwipeControlOption>, 'style' | 'layers'>,
    IControlCallback<L7Zoom> {
  style?: CSSProperties;
  onMoving?: (data: { size: number[]; ratio: number[] }) => void;
  layers: (Layer | string)[];
}

import type { IZoomControlOption, Zoom as L7Zoom } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

export interface ZoomControlProps
  extends Omit<Partial<IZoomControlOption>, 'style' | 'zoomInText' | 'zoomOutText'>,
    IControlCallback<L7Zoom> {
  style?: CSSProperties;
  zoomInText?: ReactNode;
  zoomOutText?: ReactNode;
}

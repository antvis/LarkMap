import type { IZoomControlOption, Zoom as L7Zoom } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

// @ts-ignore
export interface ZoomControlProps extends Partial<IZoomControlOption>, IControlCallback<L7Zoom> {
  style?: CSSProperties;
  zoomInText?: ReactNode;
  zoomOutText?: ReactNode;
}

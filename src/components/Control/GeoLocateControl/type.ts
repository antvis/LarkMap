import type { IGeoLocateOption, GeoLocate } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface GeoLocateControlProps
  extends Omit<Partial<IGeoLocateOption>, 'style' | 'btnIcon'>,
    IControlCallback<GeoLocate> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
}

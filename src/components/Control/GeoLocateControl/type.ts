import type { IGeoLocateOption, GeoLocate } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
// @ts-ignore
export interface GeoLocateControlProps extends Partial<IGeoLocateOption>, IControlCallback<GeoLocate> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
}

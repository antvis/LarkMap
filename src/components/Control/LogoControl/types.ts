import type { GeoLocate, ILogoControlOption } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface LogoControlProps extends Omit<Partial<ILogoControlOption>, 'style'>, IControlCallback<GeoLocate> {
  style?: CSSProperties;
}

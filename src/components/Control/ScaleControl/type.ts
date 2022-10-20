import type { IScaleControlOption, Scale } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface ScaleControlProps extends Omit<Partial<IScaleControlOption>, 'style'>, IControlCallback<Scale> {
  style?: CSSProperties;
}

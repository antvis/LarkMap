import type { IScaleControlOption, PositionName, Scale } from '@antv/l7';
import type { CSSProperties } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
// @ts-ignore
export interface ScaleControlProps extends Partial<IScaleControlOption>, IControlCallback<Scale> {
  style?: CSSProperties;
}

import type { ISelectControlOption, MapTheme } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
// @ts-ignore
export interface MapThemeControlProps extends ISelectControlOption, IPopperControlCallback<MapTheme> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string) => void;
}

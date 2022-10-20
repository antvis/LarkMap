import type { ISelectControlOption, MapTheme } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface MapThemeControlProps
  extends Omit<Partial<ISelectControlOption>, 'style' | 'btnIcon'>,
    IPopperControlCallback<MapTheme> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string) => void;
}

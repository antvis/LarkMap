import type { IFullscreenControlOption, Fullscreen } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */
export interface FullscreenControlProps
  extends Omit<Partial<IFullscreenControlOption>, 'style' | 'btnIcon' | 'exitBtnIcon'>,
    IControlCallback<Fullscreen> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  exitBtnIcon?: ReactNode;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

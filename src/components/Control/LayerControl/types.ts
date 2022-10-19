import type { Control, ILayerControlOption, LayerControl } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback } from '../../../types';

/**
 * 组件类型定义
 */

export interface ILayerControlCallback<C extends Control = Control> {
  onPopperShow?: (control: C) => void;
  onPopperHide?: (control: C) => void;
}

// @ts-ignore
export interface LayerControlProps extends Partial<ILayerControlOption>, IPopperControlCallback<LayerControl> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string[]) => void;
}

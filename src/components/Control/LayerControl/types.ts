import type { Control, ILayerControlOption, LayerControl } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IControlCallback } from '../../../types';

/**
 * 组件类型定义
 */

export interface ILayerControlCallback<C extends Control = Control> {
  onPopperShow?: (control: C) => void;
  onPopperHide?: (control: C) => void;
}

// @ts-ignore
export interface LayerControlProps
  extends Partial<ILayerControlOption>,
    IControlCallback<LayerControl>,
    ILayerControlCallback<LayerControl> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string | string[]) => void;
}

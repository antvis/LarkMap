import type { ILayerSwitchOption, LayerSwitch } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback, Layer } from '../../../types';

export type LayerSwitchItem = {
  layer: Layer | string;
  name?: string;
  img?: string;
};

export interface LayerSwitchControlProps
  extends Omit<Partial<ILayerSwitchOption>, 'style' | 'btnIcon' | 'layers'>,
    IPopperControlCallback<LayerSwitch> {
  layers: (Layer | string | LayerSwitchItem)[];
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string[]) => void;
}

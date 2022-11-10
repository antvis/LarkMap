import type { ILayerSwitchOption, LayerSwitch } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback } from '../../../types';

export interface LayerSwitchControlProps
  extends Omit<Partial<ILayerSwitchOption>, 'style' | 'btnIcon'>,
    IPopperControlCallback<LayerSwitch> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string[]) => void;
}

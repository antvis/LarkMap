import type { ILayerSwitchOption, LayerSwitch } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';
import type { IPopperControlCallback } from '../../../types';

// @ts-ignore
export interface LayerSwitchControlProps extends Partial<ILayerSwitchOption>, IPopperControlCallback<LayerSwitch> {
  style?: CSSProperties;
  btnIcon?: ReactNode;
  onSelectChange?: (value: string[]) => void;
}

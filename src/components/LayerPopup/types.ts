import type { ILayerPopupOption } from '@antv/l7';
import { ReactNode } from 'react';
import type { PopupProps } from '../Popup/types';

export interface ILayerPopupItems extends Omit<ILayerPopupOption['config'], 'title' | 'customContent'> {
  title?: ReactNode | ((feature: any) => ReactNode);
  customContent?: ReactNode | ((feature: any) => ReactNode);
}

export interface LayerPopupProps
  extends Omit<PopupProps, 'children' | 'followCursor'>,
    Pick<ILayerPopupOption, 'trigger'> {
  items: ILayerPopupOption['config'];
}

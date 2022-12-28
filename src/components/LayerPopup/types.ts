import type { ILayerPopupOption, LayerField, LayerPopupConfigItem } from '@antv/l7';
import type { ReactNode } from 'react';
import type { Layer } from '../../types';
import type { PopupProps } from '../Popup/types';

export interface ILayerField extends Omit<LayerField, 'formatField' | 'formatValue'> {
  formatField?: ReactNode | ((field: string, feature: any) => ReactNode);
  formatValue?: ReactNode | ((value: any, feature: any) => ReactNode);
}

export interface ILayerPopupConfigItem
  extends Omit<LayerPopupConfigItem, 'title' | 'customContent' | 'fields' | 'layer'> {
  title?: ReactNode | ((feature: any) => ReactNode);
  customContent?: ReactNode | ((feature: any) => ReactNode);
  fields?: (ILayerField | string)[];
  layer?: Layer | string;
}

export interface LayerPopupProps
  extends Omit<PopupProps, 'children' | 'followCursor' | 'title'>,
    Pick<ILayerPopupOption, 'trigger'> {
  items: ILayerPopupConfigItem[];
}

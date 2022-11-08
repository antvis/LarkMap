import type { ILayerPopupOption, LayerPopupConfigItem } from '@antv/l7';
import type { PopupProps } from '../Popup/types';

export interface LayerPopupProps extends Omit<PopupProps, 'children'>, Pick<ILayerPopupOption, 'trigger' | 'config'> {
  items: LayerPopupConfigItem[];
}

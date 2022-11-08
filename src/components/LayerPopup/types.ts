import type { ILayerPopupOption } from '@antv/l7';
import type { PopupProps } from '../Popup/types';

export interface LayerPopupProps extends Omit<PopupProps, 'children'>, Pick<ILayerPopupOption, 'trigger' | 'config'> {
  items: ILayerPopupOption['config'];
}

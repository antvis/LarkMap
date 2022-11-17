import type { ILayerPopupOption } from '@antv/l7';
import type { PopupProps } from '../Popup/types';

export interface LayerPopupProps
  extends Omit<PopupProps, 'children' | 'followCursor'>,
    Pick<ILayerPopupOption, 'trigger'> {
  items: ILayerPopupOption['config'];
}

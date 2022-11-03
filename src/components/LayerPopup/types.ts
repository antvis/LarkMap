import type { ILayerPopupOption } from '@antv/l7';
import type { PopupProps } from '../Popup/types';

export interface LayerPopupProps extends PopupProps, Pick<ILayerPopupOption, 'trigger' | 'config'> {}

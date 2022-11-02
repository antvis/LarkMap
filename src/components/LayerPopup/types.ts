import { ILayerPopupOption } from '@antv/l7';
import { PopupProps } from 'components/Popup/types';

export interface LayerPopupProps extends PopupProps, Pick<ILayerPopupOption, 'trigger' | 'config'> {}

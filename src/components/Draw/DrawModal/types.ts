import type { ModalProps } from 'antd/lib/modal/Modal';
import type { LarkMapProps } from '../../LarkMap/types';
import type { DrawControlProps, DrawData } from '../DrawControl/types';
import type { DrawKeyboardHelperProps } from '../DrawKeyboardHelper/types';

export interface DrawModalProps extends Omit<ModalProps, 'onOk'> {
  larkMap: LarkMapProps;
  drawControl: DrawControlProps;
  drawKeyboardHelper: Omit<DrawKeyboardHelperProps, 'draw'> | boolean;
  onSubmit?: (data: DrawData) => void;
}

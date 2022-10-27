import type { Popup } from '@antv/l7';

export interface IPopupCallback<C extends Popup = Popup> {
  onOpen?: (control: C) => void;
  onClose?: (control: C) => void;
  onShow?: (control: C) => void;
  onHide?: (control: C) => void;
}

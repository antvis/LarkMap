import type { Control } from '@antv/l7';

export interface IControlCallback<C extends Control = Control> {
  onAdd?: (control: C) => void;
  onRemove?: (control: C) => void;
  onShow?: (control: C) => void;
  onHide?: (control: C) => void;
}

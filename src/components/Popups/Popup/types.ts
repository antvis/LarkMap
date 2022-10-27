import type { IPopupOption, Popup } from '@antv/l7';
import type { ReactNode } from 'react';
import type { IPopupCallback } from 'types';

// @ts-ignore
export interface PopupProps extends Omit<Partial<IPopupOption>, 'htem' | 'title'>, IPopupCallback<Popup> {
  html?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}

import type { IPopupOption } from '@antv/l7';
import type { CSSProperties, ReactNode } from 'react';

/**
 * 组件类型定义
 */
export interface PopupProps extends Omit<Partial<IPopupOption>, 'title' | 'html' | 'style' | 'text'> {
  style?: CSSProperties;
  /** 打开信息框事件 */
  onOpen?: () => void;
  /** 关闭信息框事件 */
  onClose?: () => void;
  // 显示
  onShow?: () => void;
  // 隐藏
  onHide?: () => void;
  /** 子组件 */
  children?: ReactNode;
  // 标题
  title?: ReactNode;
}

import type { CommonProps } from '../../types/common';

export interface ContextMenuItemProps extends CommonProps {
  text: string;
  onClick?: () => void;
}
export interface ContextMenuProps extends CommonProps {
  /** 子组件 */
  children?: React.ReactNode;
}

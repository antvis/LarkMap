import type { CommonProps } from '../../types/common';

export type ContextMenuItem = {
  text?: string;
  onClick?: () => void;
};
export interface ContextMenuProps extends CommonProps {
  /** 子组件 */
  children?: React.ReactNode;
}

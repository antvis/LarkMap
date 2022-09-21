import type React from 'react';
import type { ContextMenuProps } from './types';
import { ContextMenuItem } from './ContextMenuItem';
import { ContextMenu as InternalContextMenu } from './ContextMenu';
import './index.less';

export interface InternalContextMenuType extends React.FC<ContextMenuProps> {
  Item: typeof ContextMenuItem;
}

const ContextMenu = InternalContextMenu as unknown as InternalContextMenuType;

ContextMenu.Item = ContextMenuItem;

export { ContextMenu };

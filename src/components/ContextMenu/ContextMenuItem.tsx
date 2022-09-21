import React, { memo } from 'react';
import { isEmpty } from 'lodash-es';
import classNames from 'classnames';
import type { ContextMenuItemProps } from './types';
import { CLS_PREFIX } from './constant';

export const ContextMenuItem: React.FC<ContextMenuItemProps> = memo(function ContextMenuItem(props) {
  const { text = '', onClick } = props;

  return !isEmpty(text) ? (
    <li className={classNames(`${CLS_PREFIX}__menu-item`, props?.className)} style={props?.style} onClick={onClick}>
      {text}
    </li>
  ) : null;
});

export { ContextMenuProps } from './types';

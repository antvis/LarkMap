import React, { useMemo } from 'react';
import { isEmpty } from 'lodash-es';
import type { ContextMenuItem } from './types';

export const Item: any = (props: ContextMenuItem) => {
  const { text = '', onClick } = props;

  const LiItem = useMemo(() => {
    if (!isEmpty(text)) {
      return <li onClick={onClick}>{text}</li>;
    }
    return () => {
      return null;
    };
  }, [props.text, props.onClick]);

  return LiItem;
};

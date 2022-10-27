import { useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * 将控件参数中的 ReactNode 转成 Element 格式，并返回对应的 DOM 和 Portal，其中 Portal 需要在对应的 React 组件中返回渲染
 * @param reactNode
 */
export const usePopupElement = (reactNode?: ReactNode | null) => {
  const domRef = useRef(document.createElement('span'));

  return {
    portal: reactNode ? createPortal(reactNode, domRef.current) : null,
    dom: reactNode ? domRef.current : undefined,
  };
};

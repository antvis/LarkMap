import type React from 'react';
import type { ReactPortal } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * 将控件参数中的 ReactNode 转成 Element 格式，并返回对应的 DOM 和 Portal，其中 Portal 需要在对应的 React 组件中返回渲染
 * @param reactNode
 */
// @ts-ignore
export const useL7ComponentPortal: (reactNode?: React.ReactNode | null) => {
  portal: ReactPortal | null;
  dom: HTMLElement | undefined;
} = (reactNode) => {
  const domRef = useRef(document.createElement('span'));

  return {
    portal: reactNode ? createPortal(reactNode, domRef.current) : null,
    dom: reactNode ? domRef.current : undefined,
  };
};

import { ElementType } from '@antv/l7-utils/es/dom';
import { Dispatch, ReactNode, ReactPortal, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

export const getElementTypePortal = (
  reactNode: ReactNode | ((...args: any[]) => ReactNode),
  tag: keyof HTMLElementTagNameMap,
  setPortalList: Dispatch<SetStateAction<ReactPortal[]>>,
) => {
  let elementType: ElementType | ((...args: any[]) => ElementType) = '';
  const dom = document.createElement(tag);
  let portal: ReactPortal;
  if (reactNode instanceof Function) {
    elementType = (...args: any[]) => {
      const realRenderNode = reactNode(...args);
      // @ts-ignore
      portal = createPortal(realRenderNode, dom);
      return dom;
    };
  } else {
    elementType = dom;
    // @ts-ignore
    portal = createPortal(reactNode, dom);
  }
  return {
    elementType,
    portal,
  };
};

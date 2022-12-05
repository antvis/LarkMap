import type { Dispatch, ReactNode, ReactPortal, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

/**
 * 将 render 中的 JSX 格式转换成 DOM 和 Portal 的形式
 * @param render
 * @param tag
 * @param setPortalList
 */
export const getElementTypePortal = (
  render: ReactNode | ((...args: any[]) => ReactNode),
  tag: keyof HTMLElementTagNameMap,
  setPortalList: Dispatch<SetStateAction<ReactPortal[]>>,
) => {
  // 若 render 为函数格式，则在其每次调用时重新生成 dom 和 portal
  if (render instanceof Function) {
    let previousPortal: ReactPortal;
    return {
      elementType: (...args: any[]) => {
        const dom = document.createElement(tag);
        const reactNode = render(...args);
        const portal = createPortal(reactNode, dom);
        // @ts-ignore
        setPortalList((oldPortalList) => {
          const newPortalList = [...oldPortalList];
          if (previousPortal) {
            const targetIndex = oldPortalList.indexOf(previousPortal);
            if (targetIndex > -1) {
              newPortalList.splice(targetIndex, 1);
            }
          }
          return [...newPortalList, portal];
        });
        // @ts-ignore
        previousPortal = portal;
        return dom;
      },
    };
  } else {
    const dom = document.createElement(tag);
    // @ts-ignore
    setPortalList((oldPortalList) => [...oldPortalList, createPortal(render, dom)]);
    return {
      elementType: dom,
    };
  }
};

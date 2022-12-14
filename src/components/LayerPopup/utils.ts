import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

/**
 * 将 render 中的 JSX 格式转换成 DOM 和 Portal 的形式
 * @param render
 * @param tag
 */
export const getElementTypePortal = (
  render: ReactNode | ((...args: any[]) => ReactNode),
  tag: keyof HTMLElementTagNameMap,
) => {
  // 若 render 为函数格式，则在其每次调用时重新生成 dom 和 portal
  if (render instanceof Function) {
    const dom = document.createElement(tag);
    return (...args: any[]) => {
      const reactNode = render(...args);
      const portal = ReactDOM.createPortal(reactNode, dom);
      ReactDOM.render(portal, dom);
      return dom;
    };
  } else {
    const dom = document.createElement(tag);
    const portal = ReactDOM.createPortal(render, dom);
    ReactDOM.render(portal, dom);
    return dom;
  }
};

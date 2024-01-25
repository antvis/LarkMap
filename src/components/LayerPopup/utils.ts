import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const isReact18 = +ReactDOM.version.split('.')?.[0] >= 18;

const createReactRender = (dom: HTMLElement) => {
  if (isReact18) {
    // @ts-ignore
    const root = ReactDOM.createRoot(dom);
    return {
      render: (reactNode: ReactNode) => {
        root.render(reactNode);
        return dom;
      },
    };
  } else {
    return {
      render: (reactNode: ReactNode) => {
        const portal = ReactDOM.createPortal(reactNode, dom);
        /* eslint-disable react/no-deprecated */
        ReactDOM.render(portal, dom);
        return dom;
      },
    };
  }
};

/**
 * 将 render 中的 JSX 格式转换成 DOM 和 Portal 的形式
 * @param reactNode
 * @param tag
 */
export const getElementTypePortal = (
  reactNode: ReactNode | ((...args: any[]) => ReactNode),
  tag: keyof HTMLElementTagNameMap,
) => {
  const dom = document.createElement(tag);
  // 若 render 为函数格式，则在其每次调用时重新生成 dom 和 portal
  if (reactNode instanceof Function) {
    const { render } = createReactRender(dom);
    return (...args: any[]) => {
      return render(reactNode(...args));
    };
  } else {
    const { render } = createReactRender(dom);
    return render(reactNode);
  }
};

declare module '*.less';
declare module '*.png';
declare module '*.svg';

declare module 'react-dom/client' {
  const Root: {
    render: (children: React.ReactNode) => void;
    unmount: () => void;
  };
  const createRoot: (container: HTMLElement) => Root;

  export { createRoot, Root };
}

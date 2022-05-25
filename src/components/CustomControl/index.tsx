import type React from 'react';
import { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useControl } from '../LarkMap/hooks';
import type { CustomControlProps } from './types';

export type { CustomControlProps };

export const CustomControl: React.FC<CustomControlProps> = (props): React.ReactPortal => {
  const { className, style, children, position, name } = props;
  const domRef = useRef(document.createElement('div'));

  const onCreate = useCallback(() => {
    if (className) {
      domRef.current.className = className;
    }
    if (style) {
      const cssText = Object.keys(style)
        .map((key) => `${key}:${style[key]}`)
        .join(';');
      domRef.current.style.cssText = cssText;
    }

    return domRef.current;
  }, []);

  useControl(onCreate, undefined, { position, name });

  // @ts-ignore
  return createPortal(children, domRef.current);
};

CustomControl.defaultProps = { position: 'topleft' };

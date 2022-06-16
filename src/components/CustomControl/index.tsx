import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useControl } from '../LarkMap/hooks';
import type { CustomControlProps } from './types';

export const CustomControl: React.FC<CustomControlProps> = (props): React.ReactPortal => {
  const { className, style, children, position, name } = props;
  const domRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (className) {
      domRef.current.className = className;
    }
    if (style) {
      const cssText = Object.keys(style)
        .map((key) => `${key}:${style[key]}`)
        .join(';');
      domRef.current.style.cssText = cssText;
    }
  }, [className, style]);

  const onCreate = useCallback(() => {
    return domRef.current;
  }, []);

  useControl(onCreate, undefined, { position, name });

  // @ts-ignore
  return createPortal(children, domRef.current);
};

CustomControl.defaultProps = { position: 'topleft' };

import type React from 'react';
import { createPortal } from 'react-dom';
import { useCallback, useState } from 'react';
import { useControl } from '../LarkMap/hooks';
import type { CustomControlProps } from './types';

export const CustomControl: React.FC<CustomControlProps> = (props): React.ReactPortal => {
  const { className, style, children, position, name } = props;
  const [el] = useState<HTMLDivElement>(() => document.createElement('div'));

  const onCreate = useCallback(() => {
    if (className) {
      el.className = className;
    }
    if (style) {
      const cssText = Object.keys(style)
        .map((key) => `${key}:${style[key]}`)
        .join(';');
      el.style.cssText = cssText;
    }

    return el;
  }, []);

  useControl(onCreate, undefined, { position, name });

  // @ts-ignore
  return createPortal(children, el);
};

CustomControl.defaultProps = { position: 'topleft' };

export default CustomControl;

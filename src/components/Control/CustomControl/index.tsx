import type React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { IControlOption } from '@antv/l7';
import { useControl } from '../../LarkMap/hooks';
import { getStyleText } from '../../../utils';
import type { CustomControlProps } from './types';

export const CustomControl: React.FC<CustomControlProps> = (props): React.ReactPortal => {
  const { className, style, children, position, name } = props;
  const containerRef = useRef(document.createElement('div'));
  const styleText = getStyleText(style);

  const onCreate = useCallback(() => {
    return containerRef.current;
  }, []);

  const controlOptions: IControlOption = useMemo(() => {
    return {
      position,
      name,
      className,
      style: styleText,
    };
  }, [position, name, className, styleText]);

  useControl(onCreate, undefined, controlOptions);

  // @ts-ignore
  return createPortal(children, containerRef.current);
};

CustomControl.defaultProps = { position: 'topleft' };

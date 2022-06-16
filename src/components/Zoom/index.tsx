import { Zoom as L7Zoom } from '@antv/l7';
import { useUpdateEffect } from 'ahooks';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useScene } from '../LarkMap/hooks/use-scene';
import type { ZoomProps } from './types';

const Zoom: React.FC<ZoomProps> = (props) => {
  const scene = useScene();
  const zoomRef = useRef<L7Zoom>();
  const { position } = props;

  useEffect(() => {
    const zoom = new L7Zoom({
      ...props,
    });
    zoomRef.current = zoom;
    scene.addControl(zoom);
    return () => {
      zoomRef.current = undefined;
      scene.removeControl(zoom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    if (zoomRef.current) {
      //@ts-ignore
      zoomRef.current.setPosition(position);
    }
  }, [position]);

  return null;
};

Zoom.defaultProps = { position: 'bottomright' };

export default Zoom;

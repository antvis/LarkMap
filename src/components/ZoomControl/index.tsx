import { Zoom as L7Zoom } from '@antv/l7';
import { useUpdateEffect } from 'ahooks';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useScene } from '../LarkMap/hooks/use-scene';
import type { ZoomControlProps } from './types';

export const ZoomControl: React.FC<ZoomControlProps> = (props) => {
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

  useUpdateEffect(() => {
    if (zoomRef.current) {
      zoomRef.current.setOptions({ ...props });
    }
  }, [props]);

  return null;
};

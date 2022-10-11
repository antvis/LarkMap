import { Scale as L7Scale } from '@antv/l7';
import { useUpdateEffect } from 'ahooks';
import { memo, useEffect, useRef } from 'react';
import { useScene } from '../LarkMap/hooks/use-scene';
import type { ScaleControlProps } from './types';

export const ScaleControl = memo<ScaleControlProps>(function ScaleControl(props) {
  const scene = useScene();
  const scaleRef = useRef<L7Scale>();
  const { position } = props;

  useEffect(() => {
    const scale = new L7Scale({
      ...props,
    });
    scaleRef.current = scale;
    scene.addControl(scale);

    return () => {
      scaleRef.current = undefined;
      scene.removeControl(scale);
    };
  }, []);

  useUpdateEffect(() => {
    if (scaleRef.current) {
      scaleRef.current.setPosition(position);
    }
  }, [position]);

  useUpdateEffect(() => {
    if (scaleRef.current) {
      scaleRef.current.setOptions({ ...props });
    }
  }, [props]);

  return null;
});

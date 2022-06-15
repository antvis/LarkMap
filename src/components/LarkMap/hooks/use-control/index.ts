import type { IControlOption, Scene } from '@antv/l7';
import { Control } from '@antv/l7';
import { useUpdateEffect } from 'ahooks';
import { useEffect, useRef } from 'react';
import { useScene } from '../use-scene';

export const useControl = (
  onCreate: (context: Scene) => HTMLElement,
  onRemove?: (context: Scene) => void,
  opts?: IControlOption,
) => {
  const scene = useScene();
  const customRef = useRef<Control>();

  useEffect(() => {
    const custom = new Control(opts);

    custom.onAdd = () => onCreate(scene);
    custom.onRemove = () => {};

    customRef.current = custom;
    scene.addControl(custom);

    return () => {
      if (typeof onRemove === 'function') {
        onRemove(scene);
      }
      customRef.current = null;
      scene.removeControl(custom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    if (customRef.current) {
      const { position = 'topleft' } = opts;
      //@ts-ignore
      customRef.current.setPosition(position);
    }
  }, [opts?.position]);
};

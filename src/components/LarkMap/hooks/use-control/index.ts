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
  const controlRef = useRef<Control>();

  useEffect(() => {
    // @ts-ignore
    const custom = new Control(opts);

    custom.onAdd = () => onCreate(scene);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    custom.onRemove = () => {};

    controlRef.current = custom;
    scene.addControl(custom);

    return () => {
      if (typeof onRemove === 'function') {
        onRemove(scene);
      }
      controlRef.current = null;
      scene.removeControl(custom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    controlRef.current?.setOptions(opts);
  }, [opts]);
};

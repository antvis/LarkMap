import type { IControlOption, Scene } from '@antv/l7';
import { Control } from '@antv/l7';
import { useEffect } from 'react';
import { useScene } from '../use-scene';

export const useControl = (
  onCreate: (context: Scene) => HTMLElement,
  onRemove?: (context: Scene) => void,
  opts?: IControlOption,
) => {
  const scene = useScene();

  useEffect(() => {
    const custom = new Control(opts);

    custom.onAdd = () => onCreate(scene);
    custom.onRemove = () => {};

    scene.addControl(custom);

    return () => {
      if (typeof onRemove === 'function') {
        onRemove(scene);
      }

      scene.removeControl(custom);
    };
  }, []);
};

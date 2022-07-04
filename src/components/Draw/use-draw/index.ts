import type { Scene } from '@antv/l7';
import type { BaseMode } from '@antv/l7-draw';
import { DrawEvent } from '@antv/l7-draw';
import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useScene } from '../../LarkMap/hooks';
import type { DrawData } from '../types';
import { DRAW_TYPE_MAP } from './constant';
import type { UseDrawParams } from './types';

export const useDraw = (params: UseDrawParams) => {
  const [isEnable, setIsEnable] = useState(false);
  const onDrawEnable = useCallback(() => setIsEnable(true), []);
  const onDrawDisable = useCallback(() => setIsEnable(false), []);

  const createDrawInstance: (scene: Scene, config: Pick<UseDrawParams, 'type' | 'options'>) => BaseMode | null =
    useCallback(
      (scene, { type, options }) => {
        const Draw = DRAW_TYPE_MAP[type];
        if (!Draw) {
          return null;
        }
        const newDraw = new Draw(scene, options);
        newDraw.on(DrawEvent.Enable, onDrawEnable);
        newDraw.on(DrawEvent.Disable, onDrawDisable);
        return newDraw;
      },
      [onDrawDisable, onDrawEnable],
    );

  const destroyDrawInstance = useCallback(
    (draw: BaseMode) => {
      draw.off(DrawEvent.Enable, onDrawEnable);
      draw.off(DrawEvent.Disable, onDrawDisable);
      draw.destroy();
    },
    [onDrawDisable, onDrawEnable],
  );

  const scene = useScene();
  const [draw, setDraw] = useState<BaseMode | null>(() => createDrawInstance(scene, params));
  // @ts-ignore
  const [drawData, setDrawData] = useState<DrawData>(() => draw.getData());

  useUpdateEffect(() => {
    if (scene) {
      if (draw) {
        destroyDrawInstance(draw);
        setIsEnable(false);
      }

      const newDraw = createDrawInstance(scene, params);
      setDraw(newDraw);
      // @ts-ignore
      setDrawData(draw.getData());
    }
  }, [scene, JSON.stringify(params)]);

  useEffect(() => {
    const onChange = (data: DrawData) => {
      setDrawData(data);
    };

    draw?.on(DrawEvent.Change, onChange);
    return () => {
      draw?.off(DrawEvent.Change, onChange);
    };
  }, [draw]);

  const syncDrawData = useCallback(
    (newData: DrawData) => {
      draw?.setData(newData);
      setDrawData(newData);
    },
    [draw],
  );

  const drawFuncObj = useMemo(() => {
    return {
      enable: draw.enable.bind(draw),
      disable: draw.disable.bind(draw),
      getDrawData: draw.getData.bind(draw),
    };
  }, [draw]);

  return {
    draw,
    drawData,
    setDrawData: syncDrawData,
    isEnable,
    ...drawFuncObj,
  };
};

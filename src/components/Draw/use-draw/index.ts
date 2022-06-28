import type { Scene } from '@antv/l7';
import type { BaseMode } from '@antv/l7-draw';
import { DrawerEvent, DrawEvent } from '@antv/l7-draw';
import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useScene } from '../../LarkMap/hooks';
import type { DrawData } from '../types';
import { DRAW_TYPE_MAP } from './constant';
import type { UseDrawParams } from './types';

const createDrawInstance: (scene: Scene, config: Pick<UseDrawParams, 'type' | 'options'>) => BaseMode | null = (
  scene,
  { type, options },
) => {
  const Draw = DRAW_TYPE_MAP[type];
  if (!Draw) {
    return null;
  }
  return new Draw(scene, options);
};

export const useDraw = ({ type, options }: UseDrawParams) => {
  const scene = useScene();
  const [draw, setDraw] = useState<BaseMode | null>(createDrawInstance(scene, { type, options }));
  const [drawData, setDrawData] = useState<DrawData>([]);
  const [isEnable, setIsEnable] = useState(false);

  const onDrawEnable = useCallback(() => setIsEnable(true), []);
  const onDrawDisable = useCallback(() => setIsEnable(false), []);

  useUpdateEffect(() => {
    if (scene) {
      if (draw) {
        draw.off(DrawEvent.enable, onDrawEnable);
        draw.off(DrawEvent.disable, onDrawDisable);
        draw.destroy();
        setIsEnable(false);
      }

      const newDraw = createDrawInstance(scene, {
        type,
        options,
      });
      newDraw.on(DrawEvent.enable, onDrawEnable);
      newDraw.on(DrawEvent.disable, onDrawDisable);
      setDraw(newDraw);
    }
  }, [type, scene, JSON.stringify(options)]);

  useEffect(() => {
    const onChange = (data: DrawData) => {
      setDrawData(data);
    };

    draw?.on(DrawEvent.change, onChange);
    return () => {
      draw?.off(DrawerEvent.change, onChange);
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

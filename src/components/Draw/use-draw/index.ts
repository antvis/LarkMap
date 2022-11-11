import type { BaseMode } from '@antv/l7-draw';
import { DrawEvent } from '@antv/l7-draw';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useScene } from '../../LarkMap/hooks';
import type { DrawData } from '../types';
import { DRAW_TYPE_MAP } from './constant';
import type { UseDrawParams } from './types';

export const useDraw = (params: UseDrawParams) => {
  const scene = useScene();
  // @ts-ignore
  const [drawData, setDrawData] = useState<DrawData>(() => params?.options?.initialData ?? []);

  const draw: BaseMode | null = useMemo(() => {
    if (!scene) {
      console.error('useDraw 只能使用在 LarkMap 容器中');
      return null;
    }
    const DrawClass = DRAW_TYPE_MAP[params.type];
    const newDraw: BaseMode = new DrawClass(scene, {
      ...params.options,
      initialData: drawData,
    });
    return newDraw;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, JSON.stringify(params.options), params.type]);

  // 当前是否在启用中
  const [isEnable, setIsEnable] = useState(draw.isEnable());

  useEffect(() => {
    const onEnable = () => setIsEnable(true);
    const onDisable = () => setIsEnable(false);
    const onChange = (newData: DrawData) => {
      setDrawData(newData);
    };
    draw?.setData(drawData);
    draw?.on(DrawEvent.Enable, onEnable);
    draw?.on(DrawEvent.Disable, onDisable);
    draw?.on(DrawEvent.Change, onChange);
    return () => {
      // @ts-ignore
      setDrawData(draw.getData());
      draw?.off(DrawEvent.Enable, onEnable);
      draw?.off(DrawEvent.Disable, onDisable);
      draw?.off(DrawEvent.Change, onChange);
      draw?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw]);

  const syncDrawData = useCallback(
    (newData: DrawData) => {
      draw?.setData(newData);
      setDrawData(newData);
    },
    [draw],
  );

  const drawFunctions = useMemo(() => {
    return {
      enable: draw?.enable.bind(draw),
      disable: draw?.disable.bind(draw),
      getDrawData: draw?.getData.bind(draw),
    };
  }, [draw]);

  return {
    draw,
    drawData,
    setDrawData: syncDrawData,
    isEnable,
    ...drawFunctions,
  };
};

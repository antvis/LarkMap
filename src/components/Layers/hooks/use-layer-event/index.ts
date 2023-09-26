import { useUnmount } from 'ahooks';
import { useEffect, useMemo, useRef } from 'react';
import type { Layer, LayerEventProps } from '../../../../types';
import { LayerEventMap } from './constant';

export const useLayerEvent = (
  layer: Layer,
  props: LayerEventProps,
  layerEventMap: Record<string, string> = LayerEventMap,
) => {
  // LarkMap 事件名列表
  const layerEventList = useMemo(() => Object.keys(layerEventMap), [layerEventMap]);

  const operateLayerEvents = (on: boolean) => {
    layerEventList.forEach((callbackName) => {
      const eventName = layerEventMap[callbackName];
      const callback = props[callbackName];

      if (callbackName && callback) {
        console.log(on ? 'on' : 'off', eventName, callback);
        layer[on ? 'on' : 'off'](eventName, callback);
      }
    });
  };

  const bindLayerEvents = () => operateLayerEvents(true);

  const unbindLayerEvents = () => operateLayerEvents(false);

  const isFirstRef = useRef(true);

  if (isFirstRef.current) {
    bindLayerEvents();
  }

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
    } else {
      bindLayerEvents();
    }
    return () => {
      unbindLayerEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerEventList.map((eventName) => props[eventName])]);

  useUnmount(() => {
    unbindLayerEvents();
  });
};

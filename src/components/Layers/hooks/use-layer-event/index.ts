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

  // 绑定或解绑所有事件的回调函数
  const handleLayerEvents = (type: 'on' | 'off') => {
    layerEventList.forEach((callbackName) => {
      const eventName = layerEventMap[callbackName];
      const callback = props[callbackName];

      if (callbackName && callback) {
        layer[type](eventName, callback);
      }
    });
  };

  const bindLayerEvents = () => handleLayerEvents('on');

  const unbindLayerEvents = () => handleLayerEvents('off');

  const isFirstRef = useRef(true);

  // 保证图层初始化后同步执行事件绑定，而不是在 useEffect 中异步绑定事件
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

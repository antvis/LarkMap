import { useMemo } from 'react';
import { useTrackedEffect, useUnmount } from 'ahooks';
import type { Layer, LayerEventCallback, LayerEventProps } from '../../../../types';
import { LayerEventMap } from './constant';

export const useLayerEvent = (layer: Layer, props: LayerEventProps, layerEventMap = LayerEventMap) => {
  // LarkMap 事件名列表
  const layerEventList = useMemo(() => Object.keys(layerEventMap), [layerEventMap]);

  useTrackedEffect(
    (changeIndexList: number[], previousDeps: LayerEventCallback[] = [], currentDeps: LayerEventCallback[] = []) => {
      changeIndexList.forEach((index) => {
        const eventName = layerEventMap[layerEventList[index]] as string;
        const previousCallback = previousDeps[index];
        const currentCallback = currentDeps[index];
        // 分别注销旧的事件回调并绑定新的事件
        if (previousCallback) {
          layer.off(eventName, previousCallback);
        }
        if (currentCallback) {
          layer.on(eventName, currentCallback);
        }
      });
    },
    layerEventList.map((eventName) => props[eventName]),
  );

  useUnmount(() => {
    layerEventList.forEach((key) => {
      const eventName = layerEventMap[key];
      const callback = props[key];
      if (eventName && callback) {
        layer.off(eventName, callback);
      }
    });
  });
};

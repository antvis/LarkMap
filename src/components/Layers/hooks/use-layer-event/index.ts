import { useTrackedEffect, useUnmount } from 'ahooks';
import type { BaseLayer } from '@antv/l7';
import type { LayerEventCallback, LayerEventProps } from './types';
import { LayerEventList, LayerEventMap } from './constant';

export const useLayerEvent = (layer: BaseLayer, props: LayerEventProps) => {
  useTrackedEffect(
    (changeIndexList: number[], previousDeps: LayerEventCallback[] = [], currentDeps: LayerEventCallback[] = []) => {
      changeIndexList.forEach((index) => {
        const eventName = LayerEventMap[LayerEventList[index]] as string;
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
    LayerEventList.map((eventName) => props[eventName]),
  );

  useUnmount(() => {
    LayerEventList.forEach((key) => {
      const eventName = LayerEventMap[key];
      const callback = props[key];
      if (eventName && callback) {
        layer.off(eventName, callback);
      }
    });
  });
};

import type { Control } from '@antv/l7';
import { useMemo } from 'react';
import { useTrackedEffect, useUnmount } from 'ahooks';

type CallbackFunction = (...args: any[]) => any;

/**
 * 为 Control 绑定对应事件的回调，并且在回调函数发生更新时重新绑定
 * @param control
 * @param props
 */
export const useControlEvent = <C extends Control>(control: C, props: Record<string, CallbackFunction>) => {
  const eventNameList = useMemo(() => Object.keys(props), [props]);

  useTrackedEffect((updateIndexes, previousDeps: CallbackFunction[], currentDeps: CallbackFunction[]) => {
    if (!control) {
      return;
    }
    updateIndexes.forEach((updateIndex) => {
      const previousCallback = previousDeps[updateIndex];
      const currentCallback = currentDeps[updateIndex];
      const eventName = eventNameList[updateIndex];
      if (previousCallback) {
        control.off(eventName, previousCallback);
      }
      if (currentCallback) {
        control.on(eventName, currentCallback);
      }
    });
  }, Object.values(props));

  useUnmount(() => {
    if (!control) {
      return;
    }
    eventNameList.forEach((eventName) => {
      const callback = props[eventName];
      if (callback) {
        control.off(eventName, callback);
      }
    });
  });
};

import type { Scene } from '@antv/l7';
import { useTrackedEffect, useUnmount } from 'ahooks';
import type { SceneEventProps, SceneEventCallback } from './types';
import { SceneEventList, SceneEventMap } from './constant';

export const useSceneEvent = (scene: Scene, props: SceneEventProps) => {
  useTrackedEffect(
    (changeIndexList: number[], previousDeps: SceneEventCallback[] = [], currentDeps: SceneEventCallback[] = []) => {
      //
      if (!scene) {
        return;
      }
      // 需要更新的事件对应到 deps 的数组下标，但是不包含 scene 实例的更新
      let indexList = changeIndexList.filter((index) => index);

      // 如果本次变化为 scene 的实例化则无差别遍历所有事件类型
      if (changeIndexList.includes(0)) {
        indexList = SceneEventList.map((_, index) => index + 1);
      }

      indexList.forEach((index) => {
        const eventName = SceneEventMap[SceneEventList[index]] as string;
        const previousCallback = previousDeps[index];
        const currentCallback = currentDeps[index];
        // 分别注销旧的事件回调并绑定新的事件
        if (previousCallback) {
          scene.off(eventName, previousCallback);
        }
        if (currentCallback) {
          scene.on(eventName, currentCallback);
        }
      });
    },
    [scene, ...SceneEventList.map((eventName) => props[eventName])],
  );

  useUnmount(() => {
    if (!scene) {
      return;
    }
    SceneEventList.forEach((key) => {
      const eventName = SceneEventMap[key];
      const callback = props[key];
      if (eventName && callback) {
        scene.off(eventName, callback);
      }
    });
  });
};

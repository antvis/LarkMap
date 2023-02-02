/*
 * @name         : 地图同步方法
 * @Description  : 用于将多个地图动作、视角同步
 * @Principle    : 自身发送事件后，解绑自己事件，再重新添加监听
 */

import type { Scene } from '@antv/l7';
type Instance = Scene;
export function getMapType(scene: Scene) {
  const mapVersion = scene.getMapService().version;
  return mapVersion?.includes('MAPBOX') ? 'mapbox' : 'gaode';
}

function setZoom(scene: Scene, zoom: number): void {
  const mapType = getMapType(scene);
  if (mapType === 'gaode') {
    // 高德地图必须关闭动画效果，否则无法实现联动
    //L7 针对Gao，进行的zoom+ 1 的操作
    //@ts-ignore
    scene?.map?.setZoom(zoom + 1, true);
  } else {
    //@ts-ignore
    scene?.map?.setZoom(zoom);
  }
}

function setCenter(scene: Scene, center: [number, number]) {
  const mapType = getMapType(scene);
  if (mapType === 'gaode') {
    //@ts-ignore
    scene?.map.setCenter(center, true);
  } else {
    //@ts-ignore
    scene?.map.setCenter(center);
  }
}

/**
 *
 * @param array scene的数组
 * @param options
 * @param options.zoomGap number  同步的缩放层级差距
 * @param options.mainSceneIndex number  主场景的数组索引，用于搭配 zoomGap
 * @returns Function  清除同步状态的监听函数。
 */
export function syncScene(
  array: Instance[],
  options: {
    zoomGap?: number;
    mainSceneIndex?: number;
  },
) {
  const { zoomGap = 0, mainSceneIndex } = options ?? {};
  const listeners: any = [];
  let handlers: any = [];
  const clearListener = () => {
    listeners?.forEach((call: any) => call());
    listeners.length = 0;
  };
  const handlerSync = (index: number) => {
    const usedScene = array[index];
    const center = usedScene.getCenter();
    const zoom = usedScene.getZoom();
    array.forEach((item, num) => {
      // 非当前使用scene
      if (num !== index) {
        if (num === mainSceneIndex) {
          // 非主scene
          setZoom(item, zoom - zoomGap);
          setCenter(item, [center.lng, center.lat]);
        } else {
          setZoom(item, zoom + zoomGap);
          setCenter(item, [center.lng, center.lat]);
        }
      }
    });
  };
  const handler = (index: number) => {
    clearListener();
    handlerSync(index);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initListener();
  };

  const initListener = () => {
    handlers = array.map((value, index) => {
      return handler.bind(null, index);
    });
    array.forEach((scene, index) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      listeners.push(listen(index));
    });
  };

  const listen = (index: number) => {
    const scene = array[index];
    scene.on('mapmove', handlers[index]);
    scene.on('zoomchange', handlers[index]);
    return () => {
      scene.off('mapmove', handlers[index]);
      scene.off('zoomchange', handlers[index]);
    };
  };
  array.forEach((value, index) => {
    handlerSync(index);
  });
  initListener();
  return clearListener;
}

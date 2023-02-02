/*
 * @name         : 地图同步方法
 * @Description  : 用于将多个地图动作、视角同步
 * @Principle    : 监听所有地图的move事件，触发时，先解绑自己事件，在同步所有的地图状态。再重新添加监听
 */

import type { Scene } from '@antv/l7';

// 通过Scene获取到地图引擎类型
function getMapType(scene: Scene) {
  const mapVersion = scene.getMapService().version;
  return mapVersion?.includes('MAPBOX') ? 'Mapbox' : 'Gaode';
}

// 根据不同地图引擎类型，设置地图的缩放层级
function setZoom(scene: Scene, zoom: number): void {
  const mapType = getMapType(scene);
  if (mapType === 'Gaode') {
    /**
     * NOTE: 高德地图必须关闭动画效果，否则无法实现联动
     *       L7 针对Gaode地图，进行的zoom + 1 的操作
     */
    //@ts-ignore
    scene?.map?.setZoom(zoom + 1, true);
  } else {
    scene.setZoom(zoom);
  }
}

// 根据不同地图引擎类型，设置地图的中心点
function setCenter(scene: Scene, center: [number, number]) {
  const mapType = getMapType(scene);
  if (mapType === 'Gaode') {
    // 同setZoom，高德地图关闭设置center的动画效果
    //@ts-ignore
    scene?.map.setCenter(center, true);
  } else {
    scene?.setCenter(center);
  }
}

/**
 *
 * @param array scene的数组
 * @param options
 * @param options.zoomGap number  同步的缩放层级差距
 * @param options.mainIndex number  主场景的数组索引，用于搭配 zoomGap
 * @returns Function  清除同步状态的监听函数。
 */
export function syncScene(
  array: Scene[],
  options?: {
    zoomGap?: number;
    mainIndex?: number;
  },
) {
  const { zoomGap = 0, mainIndex = 0 } = options ?? {};
  const listeners: any = [];
  let handlers: any = [];

  // 添加地图事件监听
  const listen = (index: number) => {
    const scene = array[index];
    scene.on('mapmove', handlers[index]);
    scene.on('zoomchange', handlers[index]);
    return () => {
      scene.off('mapmove', handlers[index]);
      scene.off('zoomchange', handlers[index]);
    };
  };

  const clearListener = () => {
    listeners?.forEach((call: any) => call());
    listeners.length = 0;
  };

  // 同步指定索引的scene 地图状态
  const moveScenePosition = (index: number) => {
    const usedScene = array[index];
    const center = usedScene.getCenter();
    const zoom = usedScene.getZoom();
    array.forEach((item, num) => {
      // 非当前使用scene
      if (num !== index) {
        if (num === mainIndex) {
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

  /**
   * 地图同步处理器
   * 1. 清空监听
   * 2. 同步指定地图状态
   * 3. 重新初始化地图监听
   * @param index
   */
  const syncHandler = (index: number) => {
    clearListener();
    moveScenePosition(index);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initListener();
  };

  const initListener = () => {
    handlers = array.map((value, index) => {
      // 每个地图有自己的状态同步函数
      return syncHandler.bind(null, index);
    });
    array.forEach((scene, index) => {
      // 给每个地图绑定监听
      listeners.push(listen(index));
    });
  };

  // 初始化,先将所有地图状态同步。
  array.forEach((value, index) => {
    moveScenePosition(index);
  });

  // 添加地图事件监听
  initListener();

  // 返回清除绑定的监听事件函数
  return clearListener;
}

/*
 * @name         : 地图同步方法
 * @Description  : 用于将多个地图动作、视角同步
 * @Principle    : 监听所有地图场景的 mapmove 与zoomChange 事件。触发时，解绑自己事件 => 同步所有的地图状态 => 重新添加监听
 */

import type { Scene } from '@antv/l7';

// 通过 Scene 获取到地图引擎类型
function getMapType(scene: Scene) {
  const mapVersion = scene.getMapService().version;
  return mapVersion?.includes('MAPBOX') ? 'Mapbox' : 'Gaode';
}

// 根据不同地图引擎类型，设置地图的状态「缩放层级、地图中心点、旋转角、倾角」
const updateSceneStatus = (
  scene: Scene,
  status: {
    zoom?: number;
    center?: [number, number];
    pitch?: number;
    rotation?: number;
  },
) => {
  const mapType = getMapType(scene);
  const { zoom, center, pitch, rotation } = status;
  if (mapType === 'Gaode') {
    // 高德地图关闭动画效果
    // @ts-ignore
    if (center) scene?.map.setCenter(center, true);
    // @ts-ignore
    if (zoom) scene?.map?.setZoom(zoom + 1, true);
    // @ts-ignore
    if (rotation) scene?.map?.setRotation(rotation, true);
    // @ts-ignore
    if (pitch) scene?.map?.setPitch(pitch, true);
  } else {
    if (zoom) scene?.setZoom(zoom);
    if (center) scene?.setCenter(center);
    if (rotation) scene?.setRotation(rotation);
    if (pitch) scene?.setPitch(pitch);
  }
};

/**
 *
 * @param scenes l7实例化的scene 的数组
 * @param options
 * @param options.zoomGap number  同步的缩放层级差距
 * @param options.mainIndex number  主场景的数组索引，用于搭配 zoomGap
 * @returns Function  清除同步状态的监听函数。
 */
export function syncScene(
  scenes: Scene[],
  options?: {
    zoomGap?: number;
    mainIndex?: number;
  },
) {
  const { zoomGap = 0, mainIndex = 0 } = options ?? {};
  const listeners: (() => void)[] = [];
  let handlers: (() => void)[] = [];

  // 添加地图事件监听
  const listen = (index: number) => {
    const scene = scenes[index];
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

  // 根据指定索引的 scene 同步其他 scene 状态
  const moveScenePosition = (index: number) => {
    const movedScene = scenes[index];
    const center = movedScene.getCenter();
    const zoom = movedScene.getZoom();
    const rotation = movedScene.getRotation();
    const pitch = movedScene.getPitch();
    /**
     * 根据当前地图是否为主地图，分两种情况
     * 1. 非主地图，则其他非主地图 zoom 设置当前 zoom ，主地图设置为 zoom - zoomGap
     * 2. 主地图，则其他非主地图 zoom 设置为 zoom + zoomGap
     */
    const isMovedMainScene = index === mainIndex;
    scenes.forEach((scene, num) => {
      if (num !== index) {
        // 当前需要同步的状态是不是主地图
        const sceneZoom = isMovedMainScene ? zoom + zoomGap : num === mainIndex ? zoom - zoomGap : zoom;
        updateSceneStatus(scene, {
          zoom: sceneZoom,
          center: [center.lng, center.lat],
          rotation,
          pitch,
        });
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
    handlers = scenes.map((value, index) => {
      // 每个地图有自己的状态同步函数
      return syncHandler.bind(null, index);
    });
    scenes.forEach((scene, index) => {
      // 给每个地图绑定监听
      listeners.push(listen(index));
    });
  };

  // 初始化,先将所有地图状态同步。
  scenes.forEach((value, index) => {
    moveScenePosition(index);
  });

  // 添加地图事件监听
  initListener();

  // 返回清除绑定的监听事件函数
  return clearListener;
}

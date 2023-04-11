import type { IMapConfig, IMapWrapper, ISceneConfig, Scene } from '@antv/l7';
import type { CommonProps } from '../../types/common';
import type { LayerManager } from '../../utils';

export type LarkMapContextValue = {
  scene: Scene;
  layerManager: LayerManager;
};

export type LarkMapRefAttributes = {
  /** 获取 Scene 实例 */
  getScene: () => Scene;
  /** 获取 Map 实例 */
  getMap: () => Scene['map'];
};

/**
 * 场景事件回调
 */
export type SceneEventCallback = (e?: any) => void;

/**
 * 场景事件
 */
export type SceneEventProps = Partial<{
  // 生命周期事件
  onLoaded: SceneEventCallback;
  onDestroy: SceneEventCallback;
  // 地图容器事件
  onResize: SceneEventCallback;
  onMapMove: SceneEventCallback;
  onMoveStart: SceneEventCallback;
  onMoveEnd: SceneEventCallback;
  onZoomChange: SceneEventCallback;
  onZoomStart: SceneEventCallback;
  onZoomEnd: SceneEventCallback;
  // 点击事件
  onClick: SceneEventCallback;
  onDblclick: SceneEventCallback;
  onContextMenu: SceneEventCallback;
  // 鼠标事件
  onMouseMove: SceneEventCallback;
  onMouseWheel: SceneEventCallback;
  onMouseDown: SceneEventCallback;
  onMouseOver: SceneEventCallback;
  onMouseOut: SceneEventCallback;
  onMouseUp: SceneEventCallback;
  onDragStart: SceneEventCallback;
  onDragging: SceneEventCallback;
  onDragEnd: SceneEventCallback;
}>;

/**
 * 组件类型定义
 */
export interface LarkMapProps extends CommonProps, Omit<ISceneConfig, 'id' | 'canvas' | 'map'>, SceneEventProps {
  /** 容器 id */
  id?: string;
  /** 地图实例，可选，也可以通过配置项自动生成实例 */
  map?: IMapWrapper | (() => Promise<IMapWrapper>);
  /**
   * 地图类型
   * @default 'Gaode'
   */
  mapType?: 'Gaode' | 'GaodeV1' | 'GaodeV2' | 'Mapbox' | 'Map';
  /**
   * 地图配置项
   * 配合地图类型配置地图，
   * 配置项详见 [L7-Map](https://l7.antv.antgroup.com/api/map)
   * @default {}
   * */
  mapOptions?: Partial<IMapConfig>;
  /** 场景加载成功回调 */
  onSceneLoaded?: (scene: Scene) => void;
  /** 图层管理器创建成功 */
  onLayerManagerCreated?: (layerManager: LayerManager) => void;
  children?: React.ReactNode;
}

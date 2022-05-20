import type { IMapConfig, IMapWrapper, ISceneConfig, Scene } from '@antv/l7';
import type { CommonProps } from 'types/common';
import type { LayerManager } from '../../utils';

export type LarkMapContextValue = {
  scene: Scene;
  layerManager: LayerManager;
};

/**
 * 组件类型定义
 */
export interface LarkMapProps extends CommonProps, Omit<ISceneConfig, 'id' | 'canvas' | 'map'> {
  /** 容器 id */
  id?: string;
  /** 地图实例 */
  map?: IMapWrapper;
  /** 地图类型 */
  mapType?: 'GaodeV1' | 'GaodeV2' | 'MapBox' | 'Map';
  /** 地图配置项 */
  mapConfig?: Partial<IMapConfig>;
  /** 场景加载成功回调 */
  onSceneLoaded?: (scene: Scene) => void;
  children?: React.ReactNode;
}

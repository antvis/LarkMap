import type { Bounds, Scene } from '@antv/l7';

export interface ISyncSceneOptions {
  zoomGap?: number;
  mainIndex?: number;
}
export interface SyncSceneProps {
  scenes: Scene[];
  options?: ISyncSceneOptions;
  /**
   *  自定义同步函数，可以通过此完成 bounds 同步
   * @param scene
   * @param params
   * @returns
   */
  syncCallback?: (scene: Scene, params: SyncOptions) => void;
}

export interface SyncOptions {
  scene: Scene;
  zoom: number;
  pitch: number;
  rotation: number;
  center: [number, number];
  bounds: Bounds;
}

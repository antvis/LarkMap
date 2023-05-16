import type { Bounds, Scene } from '@antv/l7';

export interface ISyncSceneOptions {
  zoomGap?: number;
  mainIndex?: number;
}
export interface SyncSceneProps {
  scenes: Scene[];
  options?: ISyncSceneOptions;
}

export interface SyncOptions {
  scene: Scene;
  zoom: number;
  pitch: number;
  rotation: number;
  center: [number, number];
  bounds: Bounds;
}

import type { Bounds, Scene } from '@antv/l7';
/**
 * 获取画布的边界盒地理坐标
 */
export function getCanvasBound(scene: Scene, bounds: Bounds): Bounds {
  const leftTop = scene.lngLatToPixel(bounds[0]);
  const rightBottom = scene.lngLatToPixel(bounds[1]);
  return [
    [leftTop.x, leftTop.y],
    [rightBottom.x, rightBottom.y],
  ];
}

import type { Bounds, Scene } from '@antv/l7';
import type { CanvasBoxRect, Position } from './types';
/**
 * 获取画布的边界盒地理坐标
 */
export function getCanvasBound(scene: Scene, bounds: Bounds): CanvasBoxRect {
  const leftBottom = scene.lngLatToContainer(bounds[0]);
  const rightTop = scene.lngLatToContainer(bounds[1]);
  return {
    x: leftBottom.x,
    y: rightTop.y,
    width: rightTop.x - leftBottom.x,
    height: leftBottom.y - rightTop.y,
  };
}
/**
 * 获取画布的边界盒地理坐标
 */
export function getCanvasRect(scene: Scene) {
  const container = scene.getContainer();
  const rect = container.getBoundingClientRect();
  const { top, left, x, y, width, height } = rect;
  return {
    x: x - left,
    y: y - top,
    width,
    height,
  };
}

export function validRect(boundsRect: CanvasBoxRect, rect: CanvasBoxRect): CanvasBoxRect {
  return {
    x: Math.max(boundsRect.x, rect.x),
    y: Math.max(boundsRect.y, rect.y),
    width: Math.min(boundsRect.width, rect.width),
    height: Math.min(boundsRect.height, rect.height),
  };
}

export function boundsPanByPixel(scene: Scene, bounds: Bounds, position: Position = { x: 0, y: 0 }): Bounds {
  const leftBottom = scene.lngLatToContainer(bounds[0]);
  const rightTop = scene.lngLatToContainer(bounds[1]);
  const panedLeftBottom = {
    x: leftBottom.x + position.x,
    y: leftBottom.y + position.y,
  };
  const panedRightTop = {
    x: rightTop.x + position.x,
    y: rightTop.y + position.y,
  };
  const leftBottomLngLat = scene.containerToLngLat([panedLeftBottom.x, panedLeftBottom.y]);
  const rightTopLngLat = scene.containerToLngLat([panedRightTop.x, panedRightTop.y]);
  return [
    [leftBottomLngLat.lng, leftBottomLngLat.lat],
    [rightTopLngLat.lng, rightTopLngLat.lat],
  ];
}

/**
 * 由于 canvas 大小不一致，需要同步两者的边界盒，避免最后显示范围不一致
 * TODO:
 */
export function syncSceneLimitBounds() {}

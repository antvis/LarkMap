import type { SceneEventProps } from './types';

/**
 * 从 LarkMap 的事件名到 Scene 事件名的映射
 */
export const SceneEventMap: Record<keyof SceneEventProps, string> = {
  onLoaded: 'loaded',
  onResize: 'resize',
  onMapMove: 'mapmove',
  onMoveStart: 'movestart',
  onMoveEnd: 'moveend',
  onZoomChange: 'zoomchange',
  onZoomStart: 'zoomstart',
  onZoomEnd: 'zoomend',
  onClick: 'click',
  onDblclick: 'dblclick',
  onMouseMove: 'mousemove',
  onMousewheel: 'mousewheel',
  onMousedown: 'mousedown',
  onContextmenu: 'contextmenu',
  onDblClick: 'dblclick',
  onMouseWheel: 'mousewheel',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',
  onMouseDown: 'mousedown',
  onContextMenu: 'contextmenu',
  onDragStart: 'dragstart',
  onDragging: 'dragging',
  onDragEnd: 'dragend',
};

/**
 * LarkMap 事件名列表
 */
export const SceneEventList = Object.keys(SceneEventMap);

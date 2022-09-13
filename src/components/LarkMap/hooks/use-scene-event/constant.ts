import type { SceneEventProps } from '../../types';

/**
 * 从 LarkMap 的事件名到 Scene 事件名的映射
 */
export const SceneEventMap: Record<keyof SceneEventProps, string> = {
  onLoaded: 'loaded',
  onDestroy: 'destroy',

  onResize: 'resize',

  onMapMove: 'mapmove',
  onMoveStart: 'movestart',
  onMoveEnd: 'moveend',
  onZoomChange: 'zoomchange',
  onZoomStart: 'zoomstart',
  onZoomEnd: 'zoomend',

  onClick: 'click',
  onDblclick: 'dblclick',
  onContextMenu: 'contextmenu',

  onMouseMove: 'mousemove',
  onMousewheel: 'mousewheel',
  onMousedown: 'mousedown',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',

  onDragStart: 'dragstart',
  onDragging: 'dragging',
  onDragEnd: 'dragend',
};

/**
 * LarkMap 事件名列表
 */
export const SceneEventList = Object.keys(SceneEventMap);

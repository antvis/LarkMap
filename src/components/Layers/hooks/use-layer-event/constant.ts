import type { LayerEventProps } from './types';

/**
 * 从 LarkMap 的事件名到 Layer 事件名的映射
 */
export const LayerEventMap: Record<keyof LayerEventProps, string> = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',
  onMouseDown: 'mousedown',
  onContextMenu: 'contextmenu',
  onUnClick: 'unclick',
  onUnMousemove: 'unmousemove',
  onUnMouseup: 'unmouseup',
  onUnMousedown: 'unmousedown',
  onUnContextMenu: 'uncontextmenu',
  onUnPick: 'unpick',
  onMouseEnter: 'mouseenter',
  onInit: 'inited',
  onAdd: 'add',
  onRemove: 'remove',
};

/**
 * LarkMap 事件名列表
 */
export const LayerEventList = Object.keys(LayerEventMap);

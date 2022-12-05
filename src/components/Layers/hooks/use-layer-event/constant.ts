import type { LayerEventProps } from '../../../../types';

/**
 * 从 LarkMap 的事件名到 Layer 事件名的映射
 */
export const LayerEventMap: Record<keyof LayerEventProps, string> = {
  // 生命周期事件
  // 代理掉的事件
  // onCreated: 'created',
  onInited: 'inited',
  onAdd: 'add',
  onRemove: 'remove',
  onShow: 'show',
  onHide: 'hide',
  onDataUpdate: 'dataUpdate',
  onLegend: 'legend',
  onLegendColor: 'legend:color',
  onLegendSize: 'legend:size',

  // 点击事件
  onClick: 'click',
  onUnClick: 'unclick',
  onDblClick: 'dblclick',
  onUndblclick: 'undblclick',
  onContextMenu: 'contextmenu',
  onUnContextMenu: 'uncontextmenu',

  // 鼠标事件
  onMouseEnter: 'mouseenter',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseUp: 'mouseup',
  onMouseDown: 'mousedown',
  onUnMousemove: 'unmousemove',
  onUnMouseup: 'unmouseup',
  onUnMousedown: 'unmousedown',
  onUnPick: 'unpick',
};

import type { ICompositeLayer, ICoreLayer } from '@antv/l7-composite-layers';

/**
 * 图层事件回调
 */
export type LayerEventCallback = (e?: any) => void;

/**
 * 图层事件
 */
export type LayerEventProps = Partial<{
  onClick: LayerEventCallback;
  onDblClick: LayerEventCallback;
  onMouseMove: LayerEventCallback;
  onMouseOut: LayerEventCallback;
  onMouseUp: LayerEventCallback;
  onMouseDown: LayerEventCallback;
  onContextMenu: LayerEventCallback;
  onUnClick: LayerEventCallback;
  onUnMousemove: LayerEventCallback;
  onUnMouseup: LayerEventCallback;
  onUnMousedown: LayerEventCallback;
  onUnContextMenu: LayerEventCallback;
  onUnPick: LayerEventCallback;
  onMouseEnter: LayerEventCallback;
  onInit: LayerEventCallback;
  onAdd: LayerEventCallback;
  onRemove: LayerEventCallback;
}>;

/** 图层公用属性   */
export interface LayerCommonProps<T> extends LayerEventProps {
  /** 图层初始化完成后回调，用于获取 layer 对象   */
  onCreated?: (layer: T) => void;
}

/** 基础与复合图层类型   */
export type Layer = ICoreLayer | ICompositeLayer;

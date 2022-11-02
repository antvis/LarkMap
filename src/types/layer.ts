import type { ICompositeLayer, ICoreLayer } from '@antv/l7-composite-layers';

/**
 * 图层事件回调
 */
export type LayerEventCallback = (e?: any) => void;

/**
 * 图层事件
 */
export type LayerEventProps = Partial<{
  // 生命周期事件
  /** 初始化完成事件 */
  onInited: LayerEventCallback;
  /** 加到场景 scene 事件 */
  onAdd: LayerEventCallback;
  /** 移除时事件 */
  onRemove: LayerEventCallback;
  /** 数据源更新事件 */
  onDataUpdate: LayerEventCallback;

  // 点击事件
  /** 点击图层事件 */
  onClick: LayerEventCallback;
  /** 图层外点击事件 */
  onUnClick: LayerEventCallback;
  /** 双击图层事件 */
  onDblClick: LayerEventCallback;
  /** 右键点击图层事件 */
  onContextMenu: LayerEventCallback;
  /**图层外点击右键事件 */
  onUnContextMenu: LayerEventCallback;

  // 鼠标事件
  /** 鼠标进入图层要素事件 */
  onMouseEnter: LayerEventCallback;
  /** 鼠标在图层上移动时触发事件 */
  onMouseMove: LayerEventCallback;
  /** 图层外鼠标移动事件 */
  onUnMousemove: LayerEventCallback;
  /** 鼠标移出图层要素事件 */
  onMouseOut: LayerEventCallback;
  /** 鼠标在图层上单击抬起事件 */
  onMouseUp: LayerEventCallback;
  /** 图层外鼠标抬起 */
  onUnMouseup: LayerEventCallback;
  /** 鼠标在图层上单击按下事件 */
  onMouseDown: LayerEventCallback;
  /** 图层外单击按下事件 */
  onUnMousedown: LayerEventCallback;
  /** 图层外的操作的所有事件 */
  onUnPick: LayerEventCallback;
}>;

/** 图层公用属性   */
export interface LayerCommonProps<T> extends LayerEventProps {
  /** 图层初始化完成后回调，用于获取 layer 对象   */
  onCreated?: (layer: T) => void;
}

/** 基础与复合图层类型   */
export type Layer = ICoreLayer | ICompositeLayer;

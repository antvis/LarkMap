import type { FlowLayer, FlowLayerOptions } from '@antv/l7-composite-layers';
import type { LayerBaseEventProps, LayerEventCallback, LayerEventProps } from '../../../../types';

export type FlowLayerMouseEventProps = Partial<{
  /** 客流点图层点击事件 */
  onCircleLayerClick: LayerEventCallback;
  /** 客流点图层外点击事件 */
  onCircleLayerUnClick: LayerEventCallback;
  /** 客流点图层双击点击事件 */
  onCircleLayerDblClick: LayerEventCallback;
  /** 客流点图层外双击点击事件 */
  onCircleLayerUndblclick: LayerEventCallback;
  /** 右键点击客流点图层事件 */
  onCircleLayerContextMenu: LayerEventCallback;
  /** 右键点击客流点图层外事件 */
  onCircleLayerUnContextMenu: LayerEventCallback;
  /** 鼠标进入客流点图层要素事件 */
  onCircleLayerMouseEnter: LayerEventCallback;
  /** 鼠标在客流点图层上移动时触发事件 */
  onCircleLayerMouseMove: LayerEventCallback;
  /** 鼠标移出客流点图层要素事件 */
  onCircleLayerMouseOut: LayerEventCallback;
  /** 鼠标在客流点图层上单击按下事件 */
  onCircleLayerMouseDown: LayerEventCallback;
  /** 鼠标在客流点图层上单击抬起事件 */
  onCircleLayerMouseUp: LayerEventCallback;
  /** 客流点图层外鼠标移动事件 */
  onCircleLayerUnMousemove: LayerEventCallback;
  /** 客流点图层外单击按下事件 */
  onCircleLayerUnMousedown: LayerEventCallback;
  /** 鼠标在客流点图层外单击抬起事件 */
  onCircleLayerUnMouseup: LayerEventCallback;
  /** 客流点图层外的操作的所有事件 */
  onCircleLayerUnPick: LayerEventCallback;
  /** 客流线图层点击事件 */
  onLineLayerClick: LayerEventCallback;
  /** 客流线图层外点击事件 */
  onLineLayerUnClick: LayerEventCallback;
  /** 客流线图层双击点击事件 */
  onLineLayerDblClick: LayerEventCallback;
  /** 客流线图层外双击点击事件 */
  onLineLayerUndblclick: LayerEventCallback;
  /** 右键点击客流线图层事件 */
  onLineLayerContextMenu: LayerEventCallback;
  /** 右键点击客流线图层外事件 */
  onLineLayerUnContextMenu: LayerEventCallback;
  /** 鼠标进入客流线图层要素事件 */
  onLineLayerMouseEnter: LayerEventCallback;
  /** 鼠标在客流线图层上移动时触发事件 */
  onLineLayerMouseMove: LayerEventCallback;
  /** 鼠标移出客流线图层要素事件 */
  onLineLayerMouseOut: LayerEventCallback;
  /** 鼠标在客流线图层上单击抬起事件 */
  onLineLayerMouseUp: LayerEventCallback;
  /** 鼠标在客流线图层上单击按下事件 */
  onLineLayerMouseDown: LayerEventCallback;
  /** 客流线图层外鼠标移动事件 */
  onLineLayerUnMousemove: LayerEventCallback;
  /** 鼠标在客流线图层外单击抬起事件 */
  onLineLayerUnMouseup: LayerEventCallback;
  /** 客流线图层外单击按下事件 */
  onLineLayerUnMousedown: LayerEventCallback;
  /** 客流线图层外的操作的所有事件 */
  onLineLayerUnPick: LayerEventCallback;
}>;

/**
 * 组件类型定义
 */

export interface FlowLayerProps
  extends FlowLayerOptions,
    LayerBaseEventProps,
    FlowLayerMouseEventProps,
    LayerEventProps {
  /** 图层初始化完成后回调，用于获取 layer 对象   */
  onCreated?: (layer: FlowLayer) => void;
}

export type IMapEvent = Record<keyof LayerBaseEventProps | keyof FlowLayerMouseEventProps, string>;

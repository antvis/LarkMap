import type { LayerBaseEventProps } from '../../../../types';
import { LayerEventMap } from '../../hooks/use-layer-event/constant';
import type { FlowLayerMouseEventProps } from './types';

export const FlowLayerEventMap: Record<keyof LayerBaseEventProps | keyof FlowLayerMouseEventProps, string> = {
  // 通用事件
  onRemove: LayerEventMap.onRemove,
  onShow: LayerEventMap.onShow,
  onHide: LayerEventMap.onHide,
  onDataUpdate: LayerEventMap.onDataUpdate,
  onLegend: LayerEventMap.onLegend,
  onLegendColor: LayerEventMap.onLegendColor,
  onLegendSize: LayerEventMap.onLegendSize,
  // 客流点点击事件
  onCircleLayerClick: 'circleLayer:' + LayerEventMap.onClick,
  onCircleLayerUnClick: 'circleLayer:' + LayerEventMap.onUnClick,
  onCircleLayerDblClick: 'circleLayer:' + LayerEventMap.onDblClick,
  onCircleLayerUndblclick: 'circleLayer:' + LayerEventMap.onUndblclick,
  onCircleLayerContextMenu: 'circleLayer:' + LayerEventMap.onContextMenu,
  onCircleLayerUnContextMenu: 'circleLayer:' + LayerEventMap.onUnContextMenu,
  onCircleLayerMouseEnter: 'circleLayer:' + LayerEventMap.onMouseEnter,
  onCircleLayerMouseMove: 'circleLayer:' + LayerEventMap.onMouseMove,
  onCircleLayerMouseOut: 'circleLayer:' + LayerEventMap.onMouseOut,
  onCircleLayerMouseUp: 'circleLayer:' + LayerEventMap.onMouseUp,
  onCircleLayerMouseDown: 'circleLayer:' + LayerEventMap.onMouseDown,
  onCircleLayerUnMousemove: 'circleLayer:' + LayerEventMap.onUnMousemove,
  onCircleLayerUnMouseup: 'circleLayer:' + LayerEventMap.onUnMouseup,
  onCircleLayerUnMousedown: 'circleLayer:' + LayerEventMap.onUnMousedown,
  onCircleLayerUnPick: 'circleLayer:' + LayerEventMap.onUnPick,

  // 客流线点击事件
  onLineLayerClick: 'lineLayer:' + LayerEventMap.onClick,
  onLineLayerUnClick: 'lineLayer:' + LayerEventMap.onUnClick,
  onLineLayerDblClick: 'lineLayer:' + LayerEventMap.onDblClick,
  onLineLayerUndblclick: 'lineLayer:' + LayerEventMap.onUndblclick,
  onLineLayerContextMenu: 'lineLayer:' + LayerEventMap.onContextMenu,
  onLineLayerUnContextMenu: 'lineLayer:' + LayerEventMap.onUnContextMenu,
  onLineLayerMouseEnter: 'lineLayer:' + LayerEventMap.onMouseEnter,
  onLineLayerMouseMove: 'lineLayer:' + LayerEventMap.onMouseMove,
  onLineLayerMouseOut: 'lineLayer:' + LayerEventMap.onMouseOut,
  onLineLayerMouseUp: 'lineLayer:' + LayerEventMap.onMouseUp,
  onLineLayerMouseDown: 'lineLayer:' + LayerEventMap.onMouseDown,
  onLineLayerUnMousemove: 'lineLayer:' + LayerEventMap.onUnMousemove,
  onLineLayerUnMouseup: 'lineLayer:' + LayerEventMap.onUnMouseup,
  onLineLayerUnMousedown: 'lineLayer:' + LayerEventMap.onUnMousedown,
  onLineLayerUnPick: 'lineLayer:' + LayerEventMap.onUnPick,
};

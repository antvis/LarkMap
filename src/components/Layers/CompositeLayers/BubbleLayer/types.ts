import type {
  BubbleLayer,
  BubbleLayerOptions,
  ColorAttr,
  SizeAttr,
  SourceOptions,
  TextLayerOptions,
} from '@antv/l7-composite-layers';
import type { LayerCommonProps, LayerEventCallback } from '../../../../types';

export type { SourceOptions, ColorAttr, SizeAttr, TextLayerOptions };

/**
 * 组件类型定义
 */
export interface BubbleLayerProps extends BubbleLayerOptions, LayerCommonProps<BubbleLayer> {
  /** 选择事件 */
  onSelect?: LayerEventCallback;
  /** 取消选择事件 */
  onUnselect?: LayerEventCallback;
}

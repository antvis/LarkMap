import type {
  BubbleLayer,
  BubbleLayerOptions,
  ColorAttr,
  SizeAttr,
  SourceOptions,
  TextLayerOptions,
} from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types/common';

export type { SourceOptions, ColorAttr, SizeAttr, TextLayerOptions };

/**
 * 组件类型定义
 */
export interface BubbleLayerProps extends BubbleLayerOptions, LayerCommonProps<BubbleLayer> {}

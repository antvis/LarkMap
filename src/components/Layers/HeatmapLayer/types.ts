import type { HeatmapLayer, HeatmapLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../types/common';

/**
 * 组件类型定义
 */
export interface HeatmapLayerProps extends HeatmapLayerOptions, LayerCommonProps<HeatmapLayer> {}

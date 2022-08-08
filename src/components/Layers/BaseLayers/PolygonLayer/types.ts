import type { PolygonLayer, PolygonLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types/common';

/**
 * 组件类型定义
 */
export interface PolygonLayerProps extends PolygonLayerOptions, LayerCommonProps<PolygonLayer> {}

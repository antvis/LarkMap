import type { PolygonLayer, PolygonLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types';

/**
 * 组件类型定义
 */
export interface PolygonLayerProps extends Omit<PolygonLayerOptions, 'onClick'>, LayerCommonProps<PolygonLayer> {}

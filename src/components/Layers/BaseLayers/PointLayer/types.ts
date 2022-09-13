import type { PointLayer, PointLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types';

/**
 * 组件类型定义
 */
export interface PointLayerProps extends Omit<PointLayerOptions, 'onClick'>, LayerCommonProps<PointLayer> {}

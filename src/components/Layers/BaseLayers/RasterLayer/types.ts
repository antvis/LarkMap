import type { RasterLayer, RasterLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types';

/**
 * 组件类型定义
 */
export interface RasterLayerProps extends RasterLayerOptions, LayerCommonProps<RasterLayer> {}

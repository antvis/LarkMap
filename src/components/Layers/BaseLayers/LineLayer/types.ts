import type { LineLayer, LineLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types';

/**
 * 组件类型定义
 */
export interface LineLayerProps extends LineLayerOptions, LayerCommonProps<LineLayer> {}

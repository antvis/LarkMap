import type { TextLayer, TextLayerOptions } from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../../types';

/**
 * 组件类型定义
 */
export interface TextLayerProps extends Omit<TextLayerOptions, 'onClick'>, LayerCommonProps<TextLayer> {}

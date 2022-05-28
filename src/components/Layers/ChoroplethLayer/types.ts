import type {
  ChoroplethLayer,
  ChoroplethLayerActiveOptions,
  ChoroplethLayerOptions,
  ChoroplethLayerSourceOptions,
} from '@antv/l7-composite-layers';
import type { LayerCommonProps } from '../../../types/common';

export type { ChoroplethLayerActiveOptions, ChoroplethLayerSourceOptions };

/**
 * 组件类型定义
 */
export interface ChoroplethLayerProps extends ChoroplethLayerOptions, LayerCommonProps<ChoroplethLayer> {}

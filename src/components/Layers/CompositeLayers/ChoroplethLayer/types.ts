import type {
  ChoroplethLayer,
  ChoroplethLayerActiveOptions,
  ChoroplethLayerOptions,
  ChoroplethLayerSourceOptions,
} from '@antv/l7-composite-layers';
import type { LayerCommonProps, LayerEventCallback } from '../../../../types';

export type { ChoroplethLayerActiveOptions, ChoroplethLayerSourceOptions };

/**
 * 组件类型定义
 */
export interface ChoroplethLayerProps extends ChoroplethLayerOptions, LayerCommonProps<ChoroplethLayer> {
  /** 选择事件 */
  onSelect?: LayerEventCallback;
  /** 取消选择事件 */
  onUnselect?: LayerEventCallback;
}

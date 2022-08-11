import type { HeatmapLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-heatmap-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHeatmapLayerStyle: HeatmapLayerStyleAttributeValue = {
  size: {
    field: '',
    value: [0, 1],
  },
  style: {
    intensity: 1,
    radius: 20,
    opacity: 0.8,
    rampColors: {
      colors: ['#0198BD', '#49E3CE', '#FAFEB3', '#FEAD54', 'D50255'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

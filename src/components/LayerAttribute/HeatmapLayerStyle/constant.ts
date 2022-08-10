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
      colors: [
        'rgb(255, 247, 236)',
        'rgb(254, 232, 200)',
        'rgb(253, 212, 158)',
        'rgb(253, 187, 132)',
        'rgb(252, 141, 89)',
        'rgb(239, 101, 72)',
        'rgb(215, 48, 31)',
        'rgb(179, 0, 0)',
        'rgb(127, 0, 0)',
      ].reverse(),
      positions: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    },
  },
};

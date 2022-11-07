import type { HeatmapLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-heatmap-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHeatmapLayerStyle: HeatmapLayerStyleAttributeValue = {
  size: undefined,
  style: {
    intensity: 1,
    radius: 20,
    opacity: 0.8,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
};

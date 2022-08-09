import type { HeatmapLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-choropleth-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHeatmapLayerStyle: HeatmapLayerStyleAttributeValue = {
  shape: 'heatmap',
  color: 'rgb(239,243,255)',
  size: 12,
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
  },
};

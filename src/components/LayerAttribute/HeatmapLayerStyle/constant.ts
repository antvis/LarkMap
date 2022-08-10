import type { HeatmapLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-heatmap-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHeatmapLayerStyle: HeatmapLayerStyleAttributeValue = {
  size: {
    field: '',
    value: [12, 15],
  },
  style: {
    intensity: 3, //全局热力权重
    radius: 20, //热力半径，单位像素
    opacity: 1, //透明度
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'], //色带
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

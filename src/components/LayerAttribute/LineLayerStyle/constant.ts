import type { LineLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-line-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultLineLayerStyle: LineLayerStyleAttributeValue = {
  size: 1.5,
  color: {
    field: 'line_name',
    value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
  },
  style: {
    opacity: 0.8,
    // lineType: 'solid' as const,
    // sourceColor: '#F7664E',
    // targetColor: '#5D7092',
  },
  minZoom: 0,
  maxZoom: 23,
  blend: 'normal',
};

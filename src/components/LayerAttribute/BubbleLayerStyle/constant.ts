import type { BubbleLayerStyle } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'larkmap-bubble-layer-style-attribute';

export const DefaultBubbleLayerStyle: BubbleLayerStyle = {
  radius: 20,
  fillColor: 'rgb(239,243,255)',
  opacity: 0.8,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: { style: { fill: 'red', fontSize: 14, textAnchor: 'center' } },
};

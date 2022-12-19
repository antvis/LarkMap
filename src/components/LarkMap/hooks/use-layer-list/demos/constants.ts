import type { PolygonLayerProps } from '@antv/larkmap';

export const PolygonLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  autoFit: true,
  shape: 'fill',
  color: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#477eb8'],
  },
  state: {
    active: true,
  },
  style: {
    opacity: 0.6,
  },
};

export const LineLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  shape: 'line',
  size: 2,
  color: '#595959',
  state: {
    active: false,
  },
};

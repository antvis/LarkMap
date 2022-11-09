export const shapeOpt = [
  { label: 'circle', value: 'circle' },
  { label: 'square', value: 'square' },
  { label: 'hexagon', value: 'hexagon' },
  { label: 'triangle', value: 'triangle' },
  { label: 'cylinder', value: 'cylinder' },
  { label: 'squareColumn', value: 'squareColumn' },
  { label: 'hexagonColumn', value: 'hexagonColumn' },
  { label: 'triangleColumn', value: 'triangleColumn' },
  { label: 'heatmap3D', value: 'heatmap3D' },
];

export const scaleType = [
  { label: 'linear', value: 'linear' },
  { label: 'power', value: 'power' },
  { label: 'log', value: 'log' },
  { label: 'quantile', value: 'quantile' },
  { label: 'quantize', value: 'quantize' },
  { label: 'threshold', value: 'threshold' },
  { label: 'diverging', value: 'diverging' },
  { label: 'sequential', value: 'sequential' },
  { label: 'cat', value: 'cat' },
];

export const heatmapCfg = {
  source: {
    parser: { type: 'csv', x: 'longitude', y: 'latitude' },
    transforms: [
      {
        type: 'hexagon',
        size: 100,
        field: 'SiteOrder',
        method: 'sum',
      },
    ],
  },
  shape: 'hexagonColumn',
  color: {
    field: 'sum',
    value: [
      'orange',
      'rgb(215, 48, 39)',
      'rgb(244, 109, 67)',
      'rgb(253, 174, 97)',
      'rgb(254, 224, 139)',
      'rgb(217, 239, 139)',
      'rgb(166, 217, 106)',
      'rgb(102, 189, 99)',
      'rgb(26, 152, 80)',
      'rgb(0, 104, 55)',
    ],
    scale: {
      type: 'sequential',
    },
  },
};

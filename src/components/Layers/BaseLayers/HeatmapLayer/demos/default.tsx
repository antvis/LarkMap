import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React from 'react';
import SourceData from './mock.json';

const source = {
  data: SourceData,
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const layerOptions = {
  autoFit: true,
  shape: 'heatmap',
  size: {
    field: 't',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <HeatmapLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

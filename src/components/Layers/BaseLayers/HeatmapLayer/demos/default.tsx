import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React from 'react';

const source = {
  data: [
    { lng: 121.473117, lat: 31.230125, t: 20 },
    { lng: 121.473337, lat: 31.230325, t: 18 },
    { lng: 121.473557, lat: 31.230525, t: 22 },
    { lng: 121.473777, lat: 31.230725, t: 24 },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const layerOptions = {
  autoFit: true,
  shape: 'heatmap' as const,
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

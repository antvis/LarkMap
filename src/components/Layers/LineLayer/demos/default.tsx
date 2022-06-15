import { LarkMap, LineLayer } from '@antv/larkmap';
import React from 'react';

const source = {
  data: [
    {
      path: [
        [108.0, 32.84],
        [85.7, 29.161],
        [101.95, 41.77],
        [114.96, 39.63],
        [117.421, 28.61],
      ],
      t: 20,
    },
  ],
  parser: { type: 'json', coordinates: 'path' },
};
const layerOptions = {
  autoFit: true,
  shape: 'line',
  size: 2,
  color: '#0f9960',
  state: {
    active: true,
  },
  style: {
    lineType: 'solid',
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <LineLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

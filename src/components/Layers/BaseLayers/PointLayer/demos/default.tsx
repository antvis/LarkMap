import { LarkMap, PointLayer } from '@antv/larkmap';
import React from 'react';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const layerOptions = {
  autoFit: true,
  shape: 'circle',
  size: 40,
  color: '#0f9960',
  state: {
    active: true,
  },
  style: {
    opacity: 0.8,
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <PointLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

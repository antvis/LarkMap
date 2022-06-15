import { LarkMap, TextLayer } from '@antv/larkmap';
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
  field: 'n',
  style: {
    fill: 'red',
    opacity: 1,
    fontSize: 22,
    stroke: '#fff',
    strokeWidth: 2,
    textAllowOverlap: false,
    padding: [5, 5],
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <TextLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

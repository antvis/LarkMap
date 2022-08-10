import { LarkMap, PolygonLayer } from '@antv/larkmap';
import React from 'react';
import hangezhouGeoJSON from './hangzhou-district.json';

const source = {
  data: hangezhouGeoJSON,
  parser: { type: 'geojson' },
};
const layerOptions = {
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

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <PolygonLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

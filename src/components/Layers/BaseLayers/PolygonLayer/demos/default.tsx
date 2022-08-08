import { LarkMap, PolygonLayer } from '@antv/larkmap';
import React from 'react';
import hangezhouGeoJSON from './xihu-district.json';

const source = {
  data: hangezhouGeoJSON,
  parser: { type: 'geojson' },
};
const layerOptions = {
  autoFit: true,
  shape: 'fill',
  color: 'blue',
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

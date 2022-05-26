import { ChoroplethLayer, LarkMap } from '@antv/larkmap';
import React from 'react';
import hangezhouGeoJSON from './xihu-district.json';

const source = {
  data: hangezhouGeoJSON,
  parser: { type: 'geojson' },
};
const state = {
  active: {
    strokeColor: 'green',
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
  select: {
    strokeColor: 'yellow',
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <ChoroplethLayer
        source={source}
        autoFit={true}
        fillColor="rgb(239,243,255)"
        opacity={0.3}
        strokeColor="blue"
        state={state}
        label={{
          field: 'name',
          visible: true,
          style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
        }}
      />
    </LarkMap>
  );
};

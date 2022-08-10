import { ChoroplethLayer, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';
import hangezhouGeoJSON from './hangzhou-district.json';

const layerSource = {
  data: hangezhouGeoJSON,
  parser: { type: 'geojson' },
};
const layerOptions = {
  autoFit: true,
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
  label: {
    field: 'name',
    visible: true,
    style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
  },
};

export default () => {
  const [source, setSource] = useState(layerSource);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <ChoroplethLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

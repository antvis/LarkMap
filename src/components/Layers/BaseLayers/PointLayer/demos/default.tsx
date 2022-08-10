import { LarkMap, PointLayer } from '@antv/larkmap';
import React from 'react';
import CityWeather from './city-weather.json';

const source = {
  data: CityWeather,
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const layerOptions = {
  autoFit: true,
  shape: 'circle',
  size: {
    field: 'temperature',
    value: ({ temperature }) => temperature,
  },
  color: {
    field: 'temperature',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
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

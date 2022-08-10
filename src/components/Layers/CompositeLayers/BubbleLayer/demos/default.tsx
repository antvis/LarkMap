import { BubbleLayer, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';
import CityWeather from '../../../BaseLayers/PointLayer/demos/city-weather.json';

const source = {
  data: CityWeather,
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const bubbleLayerOptions = {
  autoFit: true,
  radius: {
    field: 'temperature',
    value: ({ temperature }) => temperature,
  },
  fillColor: {
    field: 'temperature',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.4,
  strokeColor: 'blue',
  lineWidth: 1,
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  label: {
    field: 'temperature',
    visible: true,
    style: { fill: '#454d64', fontSize: 18, stroke: '#fff', strokeWidth: 2, textOffset: [0, -20] as [number, number] },
  },
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(bubbleLayerOptions);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

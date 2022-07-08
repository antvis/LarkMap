import { BubbleLayer, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';

const source = {
  data: [
    { lng: 120.210792, lat: 30.246026, c: 'red', t: 20, n: '杭州' },
    { lng: 121.473667, lat: 31.230525, c: 'blue', t: 24, n: '上海' },
  ],
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const bubbleLayeroptions = {
  autoFit: true,
  radius: 40,
  fillColor: '#0f9960',
  opacity: 0.4,
  strokeColor: 'blue',
  lineWidth: 2,
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  label: {
    field: 't',
    visible: true,
    style: { fill: '#454d64', fontSize: 18, stroke: '#fff', strokeWidth: 2, textOffset: [0, -20] as [number, number] },
  },
};

export default () => {
  const [layeroptions, setLayerOptions] = useState(bubbleLayeroptions);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <BubbleLayer {...layeroptions} source={source} />
    </LarkMap>
  );
};

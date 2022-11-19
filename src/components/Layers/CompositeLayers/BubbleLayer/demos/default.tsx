import type { BubbleLayerProps } from '@antv/larkmap';
import { BubbleLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const bubbleLayerOptions: Omit<BubbleLayerProps, 'source'> = {
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
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Lx96%24Pnwhw/city-weather.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <BubbleLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

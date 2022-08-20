import type { PointLayerProps } from '@antv/larkmap';
import { LarkMap, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<PointLayerProps, 'source'> = {
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
  const [options, setOptions] = useState(layerOptions);
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
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <PointLayer {...options} source={source} />
    </LarkMap>
  );
};

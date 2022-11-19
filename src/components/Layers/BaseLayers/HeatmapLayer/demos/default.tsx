import type { HeatmapLayerProps } from '@antv/larkmap';
import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<HeatmapLayerProps, 'source'> = {
  autoFit: true,
  shape: 'heatmap' as const,
  size: {
    field: 't',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/o1GNZoJ2rK/points-center.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <HeatmapLayer {...options} source={source} />
    </LarkMap>
  );
};

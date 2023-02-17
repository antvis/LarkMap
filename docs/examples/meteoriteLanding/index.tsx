import type { HeatmapLayerProps, LarkMapProps } from '@antv/larkmap';
import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [48.6, 38],
    zoom: 0,
  },
};

const layerOptions: Omit<HeatmapLayerProps, 'source'> = {
  autoFit: true,
  shape: 'heatmap',
  size: {
    field: 'year',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 10,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

export default () => {
  const [source, setSource] = useState<HeatmapLayerProps['source']>({
    data: '',
    parser: { type: 'csv', x: 'reclong', y: 'reclat' },
  });
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/60177f74-5330-43f5-9a8c-9e3098640e87.csv')
      .then((res) => res.text())
      .then((data) => setSource({ ...source, data }));
  }, []);
  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <HeatmapLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

import { HeatmapLayer, LarkMap, LarkMapProps, LineLayer, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'dark',
    center: [48.6, 38],
    zoom: 0,
  },
};

// const layerOptions = {
//   shape: 'heatmap',
// };
const layerOptions = {
  autoFit: true,
  shape: 'heatmap' as const,
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
  const [source, setSource] = useState('');
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/60177f74-5330-43f5-9a8c-9e3098640e87.csv')
      .then((res) => res.text())
      .then((data) => setSource(data));
  }, []);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '500px' }}>
      <HeatmapLayer
        {...layerOptions}
        source={{
          data: source,
          parser: { type: 'csv', x: 'reclong', y: 'reclat' },
        }}
      />
    </LarkMap>
  );
};

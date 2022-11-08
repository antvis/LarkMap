import { LarkMap, LarkMapProps, LineLayer, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'dark',
    center: [-73.993896, 40.75011],
    zoom: 8,
    // rotation: 20,
    pitch: 120,
  },
};

const lineLayerStyle = {
  shape: 'arc3d',
  state: {
    active: true,
  },
  size: 1,
  blend: 'normal',
  style: {
    opacity: 0.5,
    segmentNumber: 15,
    sourceColor: '#278188', // 起点颜色
    targetColor: '#3b1eb1', // 终点颜色
  },
  zIndex: 3,
};

const pickupPointLayerStyle = {
  shape: 'circle',
  state: {
    active: true,
  },
  size: 2,
  color: '#2773bd',
  blend: 'normal',

  zIndex: 2,
};

const dropoffPointLayerStyle = {
  shape: 'circle',
  state: {
    active: true,
  },
  size: 3,
  color: '#22409a',
  blend: 'additive',
  zIndex: 2,
};

export default () => {
  const [source, setSource] = useState('');
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/4d3e5c6e-d3d6-410e-92bc-2e3fe6745a24.csv')
      .then((res) => res.text())
      .then((data) => setSource(data));
  }, []);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '500px' }}>
      <LineLayer
        source={{
          data: source,
          parser: {
            type: 'csv',
            y: 'pickup_latitude',
            x: 'pickup_longitude',
            y1: 'dropoff_latitude',
            x1: 'dropoff_longitude',
          },
        }}
        {...lineLayerStyle}
      />
      <PointLayer
        source={{
          data: source,
          parser: {
            type: 'csv',
            y: 'pickup_latitude',
            x: 'pickup_longitude',
          },
        }}
        {...pickupPointLayerStyle}
      />
      <PointLayer
        source={{
          data: source,
          parser: {
            type: 'csv',
            y: 'dropoff_latitude',
            x: 'dropoff_longitude',
          },
        }}
        {...dropoffPointLayerStyle}
      />
    </LarkMap>
  );
};

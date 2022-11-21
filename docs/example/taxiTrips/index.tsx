import type {
  LarkMapProps,
  LineLayerProps,
  PointLayerProps,
} from '@antv/larkmap';
import { LarkMap, LineLayer, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [-73.993896, 40.75011],
    zoom: 8,
    // rotation: 20,
    pitch: 70,
  },
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
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

const pickupPointLayerOptions: Omit<PointLayerProps, 'source'> = {
  shape: 'circle',
  state: {
    active: true,
  },
  size: 2,
  color: '#2773bd',
  blend: 'normal',
  zIndex: 2,
};

const unPickupPointLayerStyle: Omit<PointLayerProps, 'source'> = {
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
  const [lineData, setLineData] = useState<LineLayerProps['source']>({
    data: '',
    parser: {
      type: 'csv',
      y: 'pickup_latitude',
      x: 'pickup_longitude',
      y1: 'dropoff_latitude',
      x1: 'dropoff_longitude',
    },
  });
  const [pickupPointData, setPickupPointData] = useState<
    LineLayerProps['source']
  >({
    data: '',
    parser: {
      type: 'csv',
      y: 'pickup_latitude',
      x: 'pickup_longitude',
    },
  });
  const [unPickupPointData, setUnPickupPointData] = useState<
    LineLayerProps['source']
  >({
    data: '',
    parser: {
      type: 'csv',
      y: 'dropoff_latitude',
      x: 'dropoff_longitude',
    },
  });
  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/4d3e5c6e-d3d6-410e-92bc-2e3fe6745a24.csv',
    )
      .then((res) => res.text())
      .then((data) => {
        setLineData({ ...lineData, data: data });
        setPickupPointData({ ...pickupPointData, data: data });
        setUnPickupPointData({ ...unPickupPointData, data: data });
      });
  }, []);
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '60vh' }}>
      <LineLayer source={lineData} {...lineLayerOptions} />
      <PointLayer source={pickupPointData} {...pickupPointLayerOptions} />
      <PointLayer source={unPickupPointData} {...unPickupPointLayerStyle} />
    </LarkMap>
  );
};

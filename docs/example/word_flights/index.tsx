import { LineLayer, LarkMap, LarkMapProps, LineLayerProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const MapConfig = {
  mapType: 'GaodeV2',
  mapOptions: {
    style: 'dark',
    zoom: 1,
  },
};

const LayerConfig = {
  autoFit: true,
  shape: 'line',
  size: 0.2,
  blend: 'normal',
  state: {
    active: false,
  },
  color: {
    field: 'origin_country',
    value: [
      'rgba(194, 46, 0,1)',
      'rgba(34, 139, 34,1)',
      'rgba(225, 119, 100,1)',
      'rgba(235, 156, 128,1)',
      'rgba(248, 192, 170,1)',
      'rgba(186, 225, 226,1)',
      'rgba(140, 206, 209,1)',
      'rgba(93, 186, 191,1)',
      'rgba(145, 215,0,1)',
      'rgba(218, 112, 214,1)',
      'rgba(0, 0, 255,1)',
    ],
  },
  style: {
    opacity: 0.6,
  },
  animate: {
    duration: 1,
    interval: 0.1,
    trailLength: 0.5,
  },
};

export default () => {
  const [source, setSource] = useState({ data: [], parser: { type: 'geojson' } });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9689a517-6931-492c-a792-e2055bb57c0a.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setSource({ data: dataArr, parser: { type: 'geojson' } });
      });
  }, []);

  return (
    <LarkMap {...(MapConfig as LarkMapProps)} style={{ height: '60vh' }}>
      <LineLayer {...(LayerConfig as LineLayerProps)} source={source} />
    </LarkMap>
  );
};

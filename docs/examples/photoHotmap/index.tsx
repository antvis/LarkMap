import type { HeatmapLayerProps, LarkMapProps } from '@antv/larkmap';
import { HeatmapLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const heatmapCfg: Omit<HeatmapLayerProps, 'source'> = {
  shape: 'hexagonColumn',
  color: {
    field: 'sum',
    value: [
      'rgba(255, 255, 255,0.5)',
      'rgb(253, 141, 255)',
      'rgb(252, 100, 255)',
      'rgb(227, 26, 28)',
      'rgb(189, 0, 38)',
      'rgb(155, 0, 100)',
      'rgb(255, 0, 200)',
      'rgb(255, 0, 0)',
    ],
  },
  size: {
    field: 'sum',
    value: ({ sum }) => {
      return sum * 200;
    },
  },
  style: {
    coverage: 0.9,
    angle: 0,
    opacity: 1.0,
  },
};

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [10, 44],
    pitch: 40,
    zoom: 3.7,
  },
};

export default () => {
  const [heatmapData, setHeatmapData] = useState({
    data: [],
    parser: { type: 'json', x: 'lat', y: 'lng' },
    transforms: [
      {
        type: 'hexagon',
        size: 50000,
        field: 'value',
        method: 'sum',
      },
    ],
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/16cd4004-b21c-455e-a2e4-c396a5ecebe1.json')
      .then((res) => res.json())
      .then((res) => setHeatmapData({ ...heatmapData, data: res }));
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <HeatmapLayer {...heatmapCfg} source={heatmapData} />
    </LarkMap>
  );
};

import { LarkMap, HeatmapLayer, HeatmapLayerProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
export default () => {
  const [pointData, SetPointData] = useState([]);
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/141ea8df-e674-4ce4-ac91-ee619f411e36.json')
      .then((res) => res.json())
      .then((data) => {
        SetPointData(data);
      });
  }, []);

  const config: HeatmapLayerProps = {
    size: { field: 'Magnitude', value: [0, 1] },
    shape: 'heatmap3D',
    style: {
      intensity: 5,
      radius: 10,
      opacity: 1.0,
      rampColors: {
        colors: ['#2E8AE6', '#69D1AB', '#DAF291', '#FFD591', '#FF7A45', '#CF1D49'],
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
    source: { data: pointData, parser: { type: 'json', x: 'Longitude', y: 'Latitude' } },
  };

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '60vh' }}
      mapOptions={{
        style: 'dark',
        zoom: 5,
        center: [-122.80009283836715, 37.05881309947238],
        pitch: 35,
      }}
    >
      <HeatmapLayer {...config} />
    </LarkMap>
  );
};

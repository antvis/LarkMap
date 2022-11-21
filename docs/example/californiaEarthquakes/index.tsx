import type {
  LarkMapProps,
  LayerPopupProps,
  PointLayerProps,
} from '@antv/larkmap';
import { LarkMap, LayerPopup, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    zoom: 5,
    center: [-122.80009283836715, 37.05881309947238],
  },
};

const layerOptions: Omit<PointLayerProps, 'source'> = {
  id: 'myPointLayer',
  autoFit: false,
  shape: 'simple',
  size: {
    field: 'Magnitude',
    value: ({ Magnitude }) => {
      return +Magnitude * 3;
    },
  },
  color: {
    field: 'Magnitude',
    scale: { type: 'quantize' },
    value: ['#762a83', '#af8dc3', '#e7d4e8', '#d9f0d3', '#7fbf7b', '#1b7837'],
  },
  style: {
    opacity: 0.8,
  },
  state: { active: true },
  blend: 'normal',
};

const layerPopupItems: LayerPopupProps['items'] = [
  {
    layer: 'myPointLayer',
    fields: ['DateTime', 'Depth', 'Magnitude', 'Source'],
  },
];

export default () => {
  const [pointData, setPointData] = useState({});

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/141ea8df-e674-4ce4-ac91-ee619f411e36.json',
    )
      .then((res) => res.json())
      .then((data) => {
        setPointData(data);
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer
        {...layerOptions}
        source={{
          data: pointData,
          parser: { type: 'json', x: 'Longitude', y: 'Latitude' },
        }}
      />
      <LayerPopup items={layerPopupItems} trigger="hover" />
    </LarkMap>
  );
};

import {
  LarkMap,
  LarkMapProps,
  LayerPopup,
  LayerPopupProps,
  PointLayer,
  PointLayerProps,
} from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 6,
  },
};
const pointLayerOptions: Omit<PointLayerProps, 'source'> = {
  id: 'customPointLayer',
  shape: 'circle',
  size: {
    field: 'count',
    value: [2, 20],
  },
  autoFit: true,
  color: {
    field: 'count',
    value: [
      '#EBCCFF',
      '#CCB0FF',
      '#AE95FF',
      '#907BFF',
      '#7262FD',
      '#5349E0',
      '#2F32C3',
      '#001BA7',
      '#00068C',
      '#5B8FF9',
      '#B27AD8',
      '#7DAAFF',
      '#CE95F5',
      '#EBB0FF',
      '#FFCCFF',
      '#9661BC',
    ],
  },
};
const layerPopupItems: LayerPopupProps['items'] = [
  {
    layer: 'customPointLayer',
    fields: ['lng', 'lat'].map((field) => {
      return {
        field,
        formatValue: (value) => +value.toFixed(6),
      };
    }),
  },
];

export default () => {
  const [pointData, setPointData] = useState<PointLayerProps['source']>({
    data: [],
    parser: { type: 'json', x: 'lat', y: 'lng' },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/6f72e4f7-ac8c-41f6-bcac-9745100083ba.json',
    )
      .then((res) => res.json())
      .then((data) => {
        setPointData({ ...pointData, data });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer source={pointData} {...pointLayerOptions} />
      <LayerPopup items={layerPopupItems} trigger="hover" />
    </LarkMap>
  );
};

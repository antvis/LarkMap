import { LarkMap, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 0,
  },
};

const layerOptions = {
  autoFit: true,
  shape: 'circle',
  size: 2,
  blend: 'additive',
  color: {
    field: 'value',
    value: [
      'rgb(102,37,6)',
      'rgb(153,52,4)',
      'rgb(204,76,2)',
      'rgb(236,112,20)',
      'rgb(254,153,41)',
      'rgb(254,196,79)',
      'rgb(254,227,145)',
    ],
  },
};

export default () => {
  const [pointData, setPointData] = useState({
    data: [],
    parser: { type: 'json', x: 'lat', y: 'lng' },
  });

  const fetchPointData = async () => {
    const res = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/16cd4004-b21c-455e-a2e4-c396a5ecebe1.json',
    );
    const result = await res.json();
    setPointData({ ...pointData, data: result });
  };

  useEffect(() => {
    fetchPointData();
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer {...layerOptions} source={pointData} />
    </LarkMap>
  );
};

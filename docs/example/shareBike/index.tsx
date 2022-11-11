import { LarkMap, LarkMapProps, PointLayer, PointLayerProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

export default () => {
  const [pointData, setPointData] = useState({
    data: [],
    parser: { type: 'geojson' },
    cluster: true,
    clusterOption: {
      radius: 5,
    },
  });

  const config = {
    mapType: 'GaodeV1',
    mapOptions: {
      style: 'normal',
      center: [120.210792, 30.246026],
      zoom: 0,
    },
  };

  const fetchPointData = async () => {
    const res = await fetch('https://gw.alipayobjects.com/os/bmw-prod/b75db584-b143-491d-83cc-cb45653cd4ed.json');
    const result = await res.json();
    setPointData({ ...pointData, data: result });
  };

  const layerOptions = {
    autoFit: true,
    shape: 'circle',
    size: {
      field: 'point_count',
      value: [15, 20, 25, 30, 35],
    },
    blend: 'normal',
    color: {
      field: 'point_count',
      value: ['#FFDF80', '#FFCB33', '#FFB200', '#FF8C00'],
    },
  };

  const layerOptionpoint = {
    autoFit: false,
    shape: { field: 'point_count', value: 'text' },
    size: 15,
    color: {
      field: 'point_count',
      value: ['#3F4BBA', '#3C73DA', '#3C73DA', '#3C73DA'],
    },
    style: {
      opacity: 1,
      strokeWidth: 0,
      stroke: '#fff',
    },
  };

  useEffect(() => {
    fetchPointData();
  }, []);

  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '60vh' }}>
      <PointLayer {...(layerOptions as unknown as PointLayerProps)} source={pointData} />
      <PointLayer {...(layerOptionpoint as unknown as PointLayerProps)} source={pointData} />
    </LarkMap>
  );
};

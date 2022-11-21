import type { LarkMapProps, PointLayerProps } from '@antv/larkmap';
import { LarkMap, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 0,
  },
};

const layerOptions2: Omit<PointLayerProps, 'source'> = {
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

const layerOption1: Omit<PointLayerProps, 'source'> = {
  autoFit: false,
  shape: { field: 'point_count', value: 'text' },
  size: 15,
  color: '#fff',
  style: {
    opacity: 1,
    strokeWidth: 0,
    stroke: '#fff',
  },
};

export default () => {
  const [pointData, setPointData] = useState<PointLayerProps['source']>({
    // @ts-ignore
    data: [],
    parser: { type: 'geojson' },
    cluster: true,
    clusterOption: {
      radius: 5,
    },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/b75db584-b143-491d-83cc-cb45653cd4ed.json',
    )
      .then(async (res) => await res.json())
      .then((data) => {
        setPointData({ ...pointData, data });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer {...layerOptions2} source={pointData} />
      <PointLayer {...layerOption1} source={pointData} />
    </LarkMap>
  );
};

import type { LarkMapProps, PointLayerProps } from '@antv/larkmap';
import { LarkMap, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

/** 地图属性配置 */
const larkMapConfig: LarkMapProps = {
  mapType: 'GaodeV1',
  mapOptions: {
    style: 'light',
    pitch: 0,
  },
  style: {
    height: 700,
  },
  logoPosition: 'bottomleft',
};
const myPointLayerOptions: Omit<PointLayerProps, 'source'> = {
  autoFit: true,
  shape: 'circle',
  size: {
    field: 'point_count',
    value: [20, 25, 30, 35, 40, 45, 50],
    scale: {
      type: 'quantile',
    },
  },
  color: '#0796D3',
  state: {
    active: {
      color: '#33a02c',
    },
  },
  style: {
    opacity: 0.8,
    strokeWidth: 1,
    stroke: '#CD853F',
  },
};
const myPointLayerTextOptions: Omit<PointLayerProps, 'source'> = {
  autoFit: false,
  shape: {
    field: 'point_count',
    value: 'text',
  },
  size: 12,
  color: '#fff',
  style: {
    opacity: 1,
    strokeWidth: 0,
    stroke: 'yellow',
  },
};

const PoiChart = () => {
  const [myPointLayerOpt] = useState(myPointLayerOptions);
  const [myPointLayerTextOpt] = useState(myPointLayerTextOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'geojson' },
    cluster: true,
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/4e466b25-1782-4772-8ec4-8af6f1289044.json')
      .then((res) => res.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap {...larkMapConfig}>
      <PointLayer {...myPointLayerOpt} source={source} />
      <PointLayer {...myPointLayerTextOpt} source={source} />
    </LarkMap>
  );
};

export default PoiChart;

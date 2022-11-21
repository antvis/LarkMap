import type { ChoroplethLayerProps, LarkMapProps } from '@antv/larkmap';
import {
  ChoroplethLayer,
  LarkMap,
  ScaleControl,
  ZoomControl,
} from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { colorList } from './utils';

/** 地图属性配置 */
const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    pitch: 0,
    zoom: 3.7,
    center: [-97.39054553110171, 39.448335349067435],
  },
  logoPosition: 'bottomleft',
};

const choroplethLayerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  id: 'unemploymentRateLayer',
  // autoFit: true,
  fillColor: {
    field: 'unemployment_rate',
    value: colorList,
    scale: {
      type: 'quantile',
    },
  },
  opacity: 0.8,
  // strokeColor: 'orange',
  lineWidth: 0.2,
  lineOpacity: 1,
  state: {
    active: { strokeColor: 'orange', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
  label: {
    field: 'NAME',
    visible: false,
    style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
  },

  blend: 'normal',
};

export default () => {
  const [source, setSource] = useState<ChoroplethLayerProps['source']>({
    data: {},
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json',
    )
      .then((res) => res.json())
      .then((dataArr) => {
        console.log(dataArr);
        setSource({ ...source, data: dataArr });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <ChoroplethLayer {...choroplethLayerOptions} source={source} />
      <ScaleControl />
      <ZoomControl />
    </LarkMap>
  );
};

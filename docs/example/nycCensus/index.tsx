import type { ChoroplethLayerProps, LarkMapProps } from '@antv/larkmap';
import { ChoroplethLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 1,
  },
};

const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: {
    field: 'boro_ct2010',
    value: [
      'rgb(255,255,178)',
      'rgb(254,217,118)',
      'rgb(254,178,76)',
      'rgb(253,141,60)',
      'rgb(240,59,32)',
      'rgb(189,0,38)',
    ],
  },
  opacity: 0.6,
  strokeColor: 'rgb(231, 159, 213)',
  lineWidth: 0.5,
  state: {
    active: {
      strokeColor: 'rgb(254, 242, 26)',
      lineWidth: 0.5,
      lineOpacity: 0.5,
    },
    select: {
      strokeColor: 'rgb(254, 242, 26)',
      lineWidth: 1.5,
      lineOpacity: 0.5,
    },
  },
  label: {
    field: 'boro_name',
    visible: true,
    style: { fill: 'black', fontSize: 10 },
  },
};

export default () => {
  const [choroplethLayerData, setChoroplethLayerData] = useState<
    ChoroplethLayerProps['source']
  >({
    data: {},
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1aa4790b-1851-4742-b3a2-744f0004ec37.json',
    )
      .then((res) => res.json())
      .then((data) => {
        setChoroplethLayerData({ ...choroplethLayerData, data });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <ChoroplethLayer {...layerOptions} source={choroplethLayerData} />
    </LarkMap>
  );
};

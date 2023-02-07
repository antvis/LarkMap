import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, RegionDownload } from '@antv/larkmap';
import React from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
    // token: 'xxxx - token',
  },
};

export default () => (
  <LarkMap {...config} style={{ height: '300px' }}>
    <RegionDownload />
  </LarkMap>
);

import React from 'react';
import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap } from '@antv/larkmap';

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
    <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
  </LarkMap>
);

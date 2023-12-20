import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
    // token: '你申请的 Key',
  },
};

export default () => (
  <LarkMap {...config} style={{ height: '300px' }}>
    <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
  </LarkMap>
);

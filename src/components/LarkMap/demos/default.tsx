import { LarkMap } from '@antv/larkmap';
import React from 'react';

const config = {
  mapType: 'GaodeV1' as const,
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026] as [number, number],
    zoom: 9,
    // token: 'xxxx - token',
  },
};

export default () => (
  <LarkMap {...config} style={{ height: '300px' }}>
    <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
  </LarkMap>
);

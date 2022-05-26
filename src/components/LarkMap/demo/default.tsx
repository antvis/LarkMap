import { LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => (
  <LarkMap
    mapType="GaodeV1"
    mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
    style={{ height: '300px' }}
  >
    <h2 style={{ position: 'absolute', left: '10px' }}>LarkMap</h2>
  </LarkMap>
);

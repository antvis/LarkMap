import { GaodeMap } from '@antv/l7';
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const mapInstance = new GaodeMap({
  style: 'dark',
  center: [120.210792, 30.246026],
  zoom: 10,
  // token: 'xxxx - token',
});

// https://codesandbox.io/s/nervous-sound-g8iu2t?file=/App.tsx

export default () => {
  return (
    <LarkMap map={mapInstance} style={{ height: '300px' }}>
      <h2 style={{ position: 'absolute', left: '10px', color: '#fff' }}>LarkMap</h2>
    </LarkMap>
  );
};

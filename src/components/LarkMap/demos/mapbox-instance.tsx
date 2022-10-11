import { Mapbox } from '@antv/l7';
import { LarkMap } from '@antv/larkmap';
import React from 'react';

const mapInstance = new Mapbox({
  style: 'dark',
  center: [120.210792, 30.246026],
  pitch: 4,
  zoom: 10,
  rotation: 19,
  // token: 'xxxx - token',
});

export default () => {
  return (
    <LarkMap map={mapInstance} style={{ height: '300px' }}>
      <h2 style={{ position: 'absolute', left: '10px', color: '#fff' }}>LarkMap</h2>
    </LarkMap>
  );
};

import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, Marker } from '@antv/larkmap';
import React from 'react';

const larkmapOptions: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: { center: [120.104735, 30.261121], zoom: 10 },
};

export default () => (
  <LarkMap {...larkmapOptions} style={{ height: '300px' }}>
    <Marker lngLat={{ lng: 120.210792, lat: 30.246026 }}>
      <div style={{ padding: 8, backgroundColor: 'pink' }}>杭州</div>
    </Marker>
  </LarkMap>
);

import { LarkMap, Marker } from '@antv/larkmap';
import React from 'react';

export default () => (
  <LarkMap mapType="Gaode" style={{ height: '300px' }}>
    <Marker lngLat={{ lng: 120.104735, lat: 30.261121 }} />
    <Marker lngLat={{ lng: 120.210792, lat: 30.246026 }}>
      <div style={{ padding: 8, backgroundColor: 'pink' }}>杭州</div>
    </Marker>
  </LarkMap>
);

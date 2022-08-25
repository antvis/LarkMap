import { LocationSearch, LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <LocationSearch position="topleft" gaodeKey="4892acc9f825e343bcf1e25a56199826" />
  </LarkMap>
);

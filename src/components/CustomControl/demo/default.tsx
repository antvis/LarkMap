import React from 'react';
import { LarkMap, CustomControl } from '@antv/lark-map';

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <CustomControl position="topleft">
      <h2>My CustomControl</h2>
    </CustomControl>
  </LarkMap>
);

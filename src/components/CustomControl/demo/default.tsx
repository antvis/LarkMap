import { CustomControl, LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <CustomControl className="myCustomControl" position="topleft">
      <h2>My CustomControl</h2>
    </CustomControl>
  </LarkMap>
);

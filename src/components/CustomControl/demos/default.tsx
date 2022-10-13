import { LarkMap, CustomControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <CustomControl
        position="topleft"
        className="customControl"
        style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', padding: 10 }}
      >
        <h1>My CustomControl</h1>
      </CustomControl>
    </LarkMap>
  );
};

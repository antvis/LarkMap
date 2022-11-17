import { LarkMap, MouseLocationControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <MouseLocationControl />
    </LarkMap>
  );
};

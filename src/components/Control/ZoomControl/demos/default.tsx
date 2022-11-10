import { LarkMap, ZoomControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px' }}>
      <ZoomControl />
    </LarkMap>
  );
};

import { LarkMap, ScaleControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <ScaleControl position="bottomleft" />
    </LarkMap>
  );
};

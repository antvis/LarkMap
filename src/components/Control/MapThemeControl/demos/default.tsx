import { LarkMap, MapThemeControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <>
      <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
        <MapThemeControl position="topleft" />
      </LarkMap>
    </>
  );
};

import { LarkMap, GeoLocateControl } from '@antv/larkmap';
import gcoord from 'gcoord';
import React from 'react';

export default () => {
  const transform = (position) => {
    return gcoord.transform(position, gcoord.WGS84, gcoord.GCJ02);
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }} transform={transform}>
      <GeoLocateControl />
    </LarkMap>
  );
};

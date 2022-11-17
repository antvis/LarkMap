import { GeoLocateControl, LarkMap } from '@antv/larkmap';
import gcoord from 'gcoord';
import React from 'react';

export default () => {
  const transform = (position) => {
    return gcoord.transform(position, gcoord.WGS84, gcoord.GCJ02);
  };

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <GeoLocateControl transform={transform} />
    </LarkMap>
  );
};

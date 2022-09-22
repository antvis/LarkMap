import { LegendProportion, LarkMap, CustomControl } from '@antv/larkmap';
import React from 'react';
import './index.less';

const config = {
  mapType: 'GaodeV1' as const,
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026] as [number, number],
    zoom: 9,
    // token: 'xxxx - token',
  },
};
export default () => {
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <CustomControl position="bottomleft">
        <LegendProportion labels={[0, 2000]} fillColor="#BF7C00" className="demo_cls" />
      </CustomControl>
    </LarkMap>
  );
};

import { LegendRamp, LarkMap, CustomControl } from '@antv/larkmap';
import React from 'react';

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
        <LegendRamp
          style={{ background: '#fff', padding: 8 }}
          isContinuous
          labels={[100, 200, 300, 400, 500, 600]}
          colors={[
            'rgb(254, 235, 226)',
            'rgb(252, 197, 192)',
            'rgb(250, 159, 181)',
            'rgb(247, 104, 161)',
            'rgb(197, 27, 138)',
            'rgb(122, 1, 119)',
          ]}
        />
      </CustomControl>
    </LarkMap>
  );
};

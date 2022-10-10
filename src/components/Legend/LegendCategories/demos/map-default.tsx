import { LegendCategories, LarkMap, CustomControl } from '@antv/larkmap';
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
        <LegendCategories
          style={{ background: '#fff', padding: 8 }}
          labels={['Category A', 'Category B', 'Category C']}
          colors={{ startColor: 'rgb(176, 242, 188)', endColor: 'rgb(37, 125, 152)' }}
        />
      </CustomControl>
    </LarkMap>
  );
};

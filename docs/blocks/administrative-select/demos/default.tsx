import type { LarkMapProps } from '@antv/larkmap';
import { CustomControl, LarkMap } from '@antv/larkmap';
import React from 'react';
import { AdministrativeSelect } from '../administrative-select';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};

export default () => {
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <CustomControl>
        <AdministrativeSelect style={{ width: 250 }} />
      </CustomControl>
    </LarkMap>
  );
};

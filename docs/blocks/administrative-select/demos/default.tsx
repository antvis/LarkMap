import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';
import { AdministrativeSelect } from '..';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};

export default () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <AdministrativeSelect
        onChange={(e: string[]) => {
          setValue(e);
        }}
        value={value}
        style={{ width: 250 }}
      />
    </LarkMap>
  );
};

import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap, LogoControl } from '@antv/larkmap';
import React from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
    // token: 'xxxx - token',
  },
  style: {
    height: '200px',
  },
  logoVisible: false,
};

export default () => {
  return (
    <LarkMap {...config}>
      <LogoControl position="bottomright" />
    </LarkMap>
  );
};

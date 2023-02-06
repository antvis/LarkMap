import { LarkMap, LogoControl } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '200px' }}>
      <LogoControl />
    </LarkMap>
  );
};

import { CustomControl, LarkMap, RegionLocation } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <>
      <LarkMap mapType="Gaode" style={{ height: '300px' }}>
        <CustomControl position="topleft">
          <RegionLocation searchParams={{ key: '[你的高德API key]' }} />
        </CustomControl>
      </LarkMap>
    </>
  );
};

import { CustomControl, LarkMap, RegionLocation } from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <>
      <LarkMap mapType="Gaode" style={{ height: '300px' }}>
        <CustomControl position="topleft">
          <RegionLocation searchParams={{ key: '98d10f05a2da96697313a2ce35ebf1a2' }} />
        </CustomControl>
      </LarkMap>
    </>
  );
};

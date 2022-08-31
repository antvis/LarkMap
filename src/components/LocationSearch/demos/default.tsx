import { LocationSearch, LarkMap } from '@antv/larkmap';
import React from 'react';

export default () => (
  <>
    <LocationSearch
      style={{ marginBottom: 8 }}
      searchParams={{
        key: '4892acc9f825e343bcf1e25a56199826',
      }}
    />
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }} />
  </>
);

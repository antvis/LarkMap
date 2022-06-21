import { DrawControl, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<any>({});

  return (
    <LarkMap mapType="GaodeV1" mapOptions={{ style: 'dark', zoom: 10 }} style={{ height: '400px' }}>
      <DrawControl
        config={{
          point: true,
          line: true,
          polygon: true,
          clear: true,
          // rect: false,
          // circle: false,
        }}
        onDrawChange={(e) => {
          console.log(e);
        }}
      />
    </LarkMap>
  );
};

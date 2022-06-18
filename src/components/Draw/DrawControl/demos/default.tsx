import { DrawControl, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<any>({
    rect: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [120.12451171875, 30.235933812981585],
              [120.15918731689453, 30.235933812981585],
              [120.15918731689453, 30.256249966213307],
              [120.12451171875, 30.256249966213307],
              [120.12451171875, 30.235933812981585],
            ],
          ],
        },
      },
    ],
  });

  return (
    <LarkMap mapType="GaodeV1" mapOptions={{ style: 'dark' }} style={{ height: '300px' }}>
      <DrawControl
        data={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LarkMap>
  );
};

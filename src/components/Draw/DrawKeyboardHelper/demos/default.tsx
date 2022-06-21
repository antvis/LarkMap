import { DrawControl, DrawKeyboardHelper, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';

export default () => {
  const [activeDraw, setActiveDraw] = useState(null);

  return (
    <LarkMap mapType="GaodeV1" mapOptions={{ zoom: 10 }} style={{ height: '400px' }}>
      <DrawControl
        config={{ point: true, line: true, polygon: true }}
        onDrawChange={(draw) => {
          setActiveDraw(draw);
        }}
      />
      <DrawKeyboardHelper draw={activeDraw ?? null} />
    </LarkMap>
  );
};

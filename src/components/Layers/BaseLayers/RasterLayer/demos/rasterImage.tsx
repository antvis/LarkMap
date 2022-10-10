import type { RasterLayerProps } from '@antv/larkmap';
import { LarkMap, RasterLayer } from '@antv/larkmap';
import React, { useState } from 'react';

const layerOptions: Omit<RasterLayerProps, 'source'> = {
  autoFit: true,
  style: {},
};

export default () => {
  const [options, setOptions] = useState(layerOptions);

  const config = {
    mapType: 'Map' as const,
    mapOptions: {
      center: [120.210792, 30.246026] as [number, number],
      zoom: 9,
    },
  };
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <RasterLayer
        {...options}
        source={{
          data: 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          parser: { type: 'rasterTile' },
        }}
      />
    </LarkMap>
  );
};

import type { LarkMapProps, RasterLayerProps } from '@antv/larkmap';
import { LarkMap, RasterLayer } from '@antv/larkmap';
import React from 'react';

const config: LarkMapProps = {
  mapType: 'Map',
  mapOptions: {
    center: [120.210792, 30.246026] as [number, number],
    zoom: 9,
  },
};

const layerOptions: Omit<RasterLayerProps, 'source'> = {
  visible: true,
  style: {},
};

export default () => {
  return (
    <LarkMap {...config} style={{ height: '300px' }}>
      <RasterLayer
        {...layerOptions}
        source={{
          data: 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          parser: { type: 'rasterTile', tileSize: 256, zoomOffset: 0 },
        }}
      />
    </LarkMap>
  );
};

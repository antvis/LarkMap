import { LarkMap, RasterLayer, SwipeControl, useLayer } from '@antv/larkmap';
import React from 'react';

const CustomComponent = () => {
  const rightRasterLayer = useLayer('rightRasterLayer');
  return (
    <SwipeControl orientation="vertical" ratio={0.5} layers={['leftRasterLayer']} rightLayers={[rightRasterLayer]} />
  );
};

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <RasterLayer
        id="rightRasterLayer"
        source={{
          data: 'https://tiles{1-3}.geovisearth.com/base/v1/ter/{z}/{x}/{y}?format=webp&tmsIds=w&token=b2a0cfc132cd60b61391b9dd63c15711eadb9b38a9943e3f98160d5710aef788',
          parser: { maxZoom: 21, minZoom: 3, type: 'rasterTile', tileSize: 256, zoomOffset: 0 },
        }}
      />
      <RasterLayer
        id="leftRasterLayer"
        source={{
          data: 'https://tiles{1-3}.geovisearth.com/base/v1/img/{z}/{x}/{y}?format=webp&tmsIds=w&token=b2a0cfc132cd60b61391b9dd63c15711eadb9b38a9943e3f98160d5710aef788',
          parser: {
            type: 'rasterTile',
            tileSize: 256,
            zoomOffset: 0,
          },
        }}
      />
      <CustomComponent />
    </LarkMap>
  );
};

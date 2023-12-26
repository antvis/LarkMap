import { LarkMap, LayerSwitchControl, RasterLayer, useLayer } from '@antv/larkmap';
import React from 'react';

const GOOGLE_TILE_MAP_URL = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&gl=CN&x={x}&y={y}&z={z}';

const GOOGLE_TILE_MAP_ROUTER_URL = 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=h&gl=CN&x={x}&y={y}&z={z}';

const CustomComponent = () => {
  const googleTileMap = useLayer('googleTileMap');
  const googleTileMapRouter = useLayer('googleTileMapRouter');

  return (
    <LayerSwitchControl
      multiple={false}
      layers={[
        {
          layer: googleTileMap,
          name: '遥感影像图层',
          img: 'https://mdn.alipayobjects.com/huamei_k6sfo0/afts/img/A*fG9HQpyNuv0AAAAAAAAAAAAADjWqAQ/original',
        },
        {
          layer: googleTileMapRouter,
          name: '文字标注图层',
          img: 'https://mdn.alipayobjects.com/huamei_k6sfo0/afts/img/A*CP5pQY_8Q_YAAAAAAAAAAAAADjWqAQ/original',
        },
      ]}
    />
  );
};

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <RasterLayer
        key={GOOGLE_TILE_MAP_URL}
        zIndex={1}
        id="googleTileMap"
        source={{
          data: GOOGLE_TILE_MAP_URL,
          parser: { type: 'rasterTile', tileSize: 256, zoomOffset: 0 },
        }}
      />
      <RasterLayer
        key={GOOGLE_TILE_MAP_ROUTER_URL}
        zIndex={1}
        id="googleTileMapRouter"
        source={{
          data: GOOGLE_TILE_MAP_ROUTER_URL,
          parser: { type: 'rasterTile', tileSize: 256, zoomOffset: 0 },
        }}
      />
      <CustomComponent />
    </LarkMap>
  );
};

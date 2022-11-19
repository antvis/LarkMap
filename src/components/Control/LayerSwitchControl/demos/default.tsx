import {
  LarkMap,
  LayerSwitchControl,
  LineLayer,
  PolygonLayer,
} from '@antv/larkmap';
import React from 'react';

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <LayerSwitchControl layers={['边框图层', '填充图层']} />

      <LineLayer
        name="边框图层"
        size={2}
        color={'rgb(255,0,0)'}
        source={{
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [120.12039184570312, 30.181934730780572],
                    [120.25634765624999, 30.181934730780572],
                    [120.25634765624999, 30.274486436999464],
                    [120.12039184570312, 30.274486436999464],
                    [120.12039184570312, 30.181934730780572],
                  ],
                },
              },
            ],
          },
        }}
      />

      <PolygonLayer
        name="填充图层"
        color={'rgba(255,0,0,0.5)'}
        source={{
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [120.12039184570312, 30.181934730780572],
                      [120.25634765624999, 30.181934730780572],
                      [120.25634765624999, 30.274486436999464],
                      [120.12039184570312, 30.274486436999464],
                      [120.12039184570312, 30.181934730780572],
                    ],
                  ],
                },
              },
            ],
          },
        }}
      />
    </LarkMap>
  );
};

import React from 'react';
import { LarkMap, AreaLayer } from '@antv/lark-map';

const source = {
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: '上海市', code: 310000, c: 'red', t: 20 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [115.1806640625, 30.637912028341123],
              [114.9609375, 29.152161283318915],
              [117.79541015625001, 27.430289738862594],
              [118.740234375, 29.420460341013133],
              [117.46582031249999, 31.50362930577303],
              [115.1806640625, 30.637912028341123],
            ],
          ],
        },
      },
    ],
  },
  parser: { type: 'geojson' },
};
const state = {
  active: {
    strokeColor: 'green',
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
  select: {
    strokeColor: 'yellow',
    lineWidth: 1.5,
    lineOpacity: 0.8,
  },
};

export default () => {
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <AreaLayer
        source={source}
        autoFit={true}
        fillColor="rgb(239,243,255)"
        opacity={0.3}
        lineWidth={1}
        strokeColor="rgb(93,112,146)"
        state={state}
        label={{
          name: 'name',
          style: { fill: 'red', fontSize: 12 },
        }}
      />
    </LarkMap>
  );
};

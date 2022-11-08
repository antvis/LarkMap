import { BubbleLayer, LarkMap, LineLayer } from '@antv/larkmap';
import React from 'react';
import { pointData } from './mock';

export default () => {
  const parserData = () => {
    return {
      type: 'FeatureCollection',
      features: pointData
        .filter((item) => item.latitude_form)
        .map((item) => {
          return {
            type: 'Feature',
            properties: { ...item },
            geometry: {
              type: 'LineString',
              coordinates: [
                [item.longitude_form, item.latitude_form],
                [item.longitude_to, item.latitude_to],
              ],
            },
          };
        }),
    };
  };

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '60vh' }}
      mapOptions={{ style: 'normal', zoom: 4, center: [113.477391, 34.626256] }}
    >
      <LineLayer
        size={{
          field: 'time',
          value: (val: Record<string, any>) => {
            if (val.time === '') {
              return 18;
            }
            return +val.time.slice(0, 1) < 2 ? 6 : +val.time.slice(0, 1) + 4;
          },
        }}
        style={
          {
            opacity: [
              'time',
              (e: string) => {
                return +e.slice(0, 1) / 10 < 0.2 ? 0.2 : +e.slice(0, 1) / 10;
              },
            ],
            sourceColor: 'orange',
            targetColor: 'red',
            arrow: {
              enable: true,
              arrowWidth: 0.9,
              arrowHeight: 0.9,
              tailWidth: 10,
            },
          } as any
        }
        source={{ data: parserData(), parser: { type: 'geojson' } }}
      />

      <BubbleLayer
        label={{
          field: 'time',
          style: { fontSize: 12, textOffset: [70, -4], fill: 'white' },
        }}
        source={{
          data: pointData,
          parser: { type: 'json', x: 'longitude_to', y: 'latitude_to' },
        }}
        fillColor={'rgb(251,0,8)'}
        strokeColor={'white'}
        opacity={0.8}
        radius={{
          field: 'time',
          value: (val: Record<string, any>) => {
            if (val.time === '') {
              return 18;
            }
            return +val.time.slice(0, 1) < 2 ? 6 : +val.time.slice(0, 1) + 6;
          },
        }}
      />
      <BubbleLayer
        source={{
          data: pointData,
          parser: { type: 'json', x: 'longitude_to', y: 'latitude_to' },
        }}
        fillColor={'white'}
        radius={2}
      />
    </LarkMap>
  );
};

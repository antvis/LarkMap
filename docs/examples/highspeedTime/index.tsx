import type { BubbleLayerProps, LarkMapProps, LineLayerProps } from '@antv/larkmap';
import { BubbleLayer, LarkMap, LineLayer } from '@antv/larkmap';
import React from 'react';
import { LINE_DATA, POINT_DATA } from './mock';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    zoom: 3,
    center: [113.477391, 34.626256],
  },
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  size: {
    field: 'time',
    value: (val: Record<string, any>) => {
      if (val.time === '') {
        return 18;
      }
      return +val.time.slice(0, 1) < 2 ? 6 : +val.time.slice(0, 1) + 4;
    },
  },
  style: {
    opacity: [
      'time',
      (e: string) => {
        return +e.slice(0, 1) / 10 < 0.2 ? 0.2 : +e.slice(0, 1) / 10;
      },
    ],
    sourceColor: 'orange',
    targetColor: 'red',
    // @ts-ignore
    arrow: {
      enable: true,
      arrowWidth: 0.9,
      arrowHeight: 0.9,
      tailWidth: 10,
    },
  },
};

const bubbleLayerOptions: Omit<BubbleLayerProps, 'source'> = {
  label: {
    field: 'time',
    style: { fontSize: 12, textOffset: [70, -4], fill: 'white' },
  },
  fillColor: 'rgb(251,0,8)',
  strokeColor: 'white',
  opacity: 0.8,
  radius: {
    field: 'time',
    value: (val: Record<string, any>) => {
      if (val.time === '') {
        return 18;
      }
      return +val.time.slice(0, 1) < 2 ? 6 : +val.time.slice(0, 1) + 6;
    },
  },
};

export default () => {
  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <LineLayer {...lineLayerOptions} source={{ data: LINE_DATA, parser: { type: 'geojson' } }} />

      <BubbleLayer
        {...bubbleLayerOptions}
        source={{
          data: POINT_DATA,
          parser: { type: 'json', x: 'longitude_to', y: 'latitude_to' },
        }}
      />
      <BubbleLayer
        source={{
          data: POINT_DATA,
          parser: { type: 'json', x: 'longitude_to', y: 'latitude_to' },
        }}
        fillColor={'white'}
        radius={2}
      />
    </LarkMap>
  );
};

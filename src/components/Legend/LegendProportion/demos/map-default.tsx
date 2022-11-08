import type { BubbleLayerProps } from '@antv/larkmap';
import { BubbleLayer, LarkMap, CustomControl, LegendProportion } from '@antv/larkmap';
import { max, min } from 'lodash-es';
import React, { useEffect, useState } from 'react';

const colors = [
  'rgb(247, 144, 124)',
  'rgb(231, 225, 239)',
  'rgb(212, 185, 218)',
  'rgb(201, 148, 199)',
  'rgb(223, 101, 176)',
  'rgb(231, 41, 138)',
  'rgb(206, 18, 86)',
  'rgb(152, 0, 67)',
  'rgb(103, 0, 31)',
];

const bubbleLayerOptions: Omit<BubbleLayerProps, 'source'> = {
  autoFit: true,
  radius: {
    field: 'value',
    value: [10, 50],
  },
  fillColor: {
    field: 'type',
    value: colors,
  },
  opacity: 0.9,
  strokeColor: '#fff',
  lineWidth: 1,
  label: {
    field: 'name',
    visible: true,
    style: { fill: '#000', fontSize: 12, stroke: '#fff' },
  },
};

export default () => {
  const [layerOptions] = useState(bubbleLayerOptions);
  const [legendItems, setLegendItems] = useState<any>([]);

  const [source, setSource] = useState([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/4e466b25-1782-4772-8ec4-8af6f1289044.json')
      .then((response) => response.json())
      .then((res: any) => {
        const result = res.features.map(({ properties, geometry }) => {
          return {
            ...properties,
            lng: geometry.coordinates[0][0],
            lat: geometry.coordinates[0][1],
          };
        });
        setSource(result);
      });
  }, []);

  const Legend = () => {
    if (!legendItems.length) return null;
    const label = legendItems.map((item) => item.value);
    return <LegendProportion labels={[min(label), max(label)]} className="demo_cls" />;
  };

  return (
    <LarkMap mapType="GaodeV1" style={{ height: 500 }}>
      <BubbleLayer
        {...layerOptions}
        source={{ data: source, parser: { type: 'json', x: 'lng', y: 'lat' } }}
        onCreated={(l) => {
          console.log(l.getLegend('size').items);
          setLegendItems(l.getLegend('size').items);
        }}
      />
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
    </LarkMap>
  );
};

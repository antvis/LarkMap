import type { LarkMapProps, PointLayerProps } from '@antv/larkmap';
import { CustomControl, LarkMap, LegendCategories, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    zoom: 1,
    center: [116.368652, 39.93866],
  },
};

const legendItems = [
  { color: 'rgba(31,194,134,.8)', label: '自然景观', value: 'Natural' },
  { color: 'rgba(249,101,52,.8)', label: '人文景观', value: 'Cultural' },
  { color: 'rgba(255,255,115,.8)', label: '混合景观', value: 'Mixed' },
];

const pointLayerOptions: Omit<PointLayerProps, 'source'> = {
  autoFit: false,
  shape: 'simple',
  size: 6,
  scale: {
    type: {
      type: 'diverging',
      unknown: '#cf1bf4',
      domain: ['Natural', 'Cultural', 'Mixed'],
    },
  },
  color: {
    field: 'category',
    value: (category: any) => {
      return legendItems.find((item) => item.value === category.category)?.color ?? legendItems[0].color;
    },
  },
  style: {
    opacity: 0.8,
    // strokeWidth: 2,
  },
  state: { active: true },
};

export default () => {
  const [pointData, SetPointData] = useState({});
  const fetchPointData = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/a9b4b5af-0565-4871-97af-2e6ce75cc9a3.json')
      .then((res) => res.json())
      .then((data) => {
        const datas = {
          type: 'FeatureCollection',
          features: data.map((item: any) => {
            return {
              type: 'Feature',
              properties: { ...item },
              geometry: {
                type: 'Point',
                coordinates: [+item.longitude, +item.latitude],
              },
            };
          }),
        };
        SetPointData(datas);
      });
  };

  useEffect(() => {
    fetchPointData();
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer {...pointLayerOptions} source={{ data: pointData, parser: { type: 'geojson' } }} />
      <CustomControl position="bottomleft">
        <LegendCategories
          style={{ background: '#fff', padding: 8 }}
          colors={legendItems.map((item) => item.color)}
          labels={legendItems.map((item) => item.label)}
        />
      </CustomControl>
    </LarkMap>
  );
};

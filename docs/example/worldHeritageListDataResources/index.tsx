import { CustomControl, LarkMap, PointLayer } from '@antv/larkmap';
import React, { useState } from 'react';
import './index.less';

export default () => {
  const [pointData, SetPointData] = useState([]);
  const data = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/a9b4b5af-0565-4871-97af-2e6ce75cc9a3.json')
      .then((res) => res.json())
      .then((data) => {
        SetPointData(data);
      });
    return {
      type: 'FeatureCollection',
      features: pointData.map((item: any) => {
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
  };

  const legendItem = [
    { value: 'rgba(31,194,134,.8)', label: '自然景观' },
    { value: 'rgba(249,101,52,.8)', label: '人文景观' },
    { value: 'rgba(255,255,115,.8)', label: '混合景观' },
  ];

  return (
    <LarkMap
      mapType="GaodeV2"
      style={{ height: '60vh' }}
      mapOptions={{
        style: 'normal',
        zoom: 1,
        center: [116.368652, 39.93866],
      }}
    >
      <PointLayer
        autoFit={false}
        shape="simple"
        size={6}
        scale={{
          type: {
            type: 'diverging',
            unknown: '#cf1bf4',
            domain: ['Natural', 'Cultural', 'Mixed'],
          },
        }}
        color={{
          field: 'category',
          value: ['#1fc286', '#ffff73', '#f96534'],
        }}
        style={{
          opacity: 0.8,
          strokeWidth: 2,
        }}
        source={{ data: data(), parser: { type: 'geojson' } }}
        state={{ active: true }}
      />
      <CustomControl className="myCustomLegends" position="bottomleft">
        <div style={{ padding: 8, background: 'rgb(255,255,255)', borderRadius: '8px' }}>
          {legendItem.map((item) => {
            return (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="circle" style={{ background: item.value }} />
                {item.label}
              </div>
            );
          })}
        </div>
      </CustomControl>
    </LarkMap>
  );
};

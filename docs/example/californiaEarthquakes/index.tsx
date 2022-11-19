import { LarkMap, PointLayer, Popup } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const cofing = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    zoom: 5,
    center: [-122.80009283836715, 37.05881309947238],
  },
};

const pointOptions = {
  autoFit: false,
  shape: 'simple',
  size: {
    field: 'Magnitude',
    value: ({ Magnitude }) => {
      return +Magnitude * 3;
    },
  },
  color: {
    field: 'Magnitude',
    scale: { type: 'quantize' },
    value: ['#762a83', '#af8dc3', '#e7d4e8', '#d9f0d3', '#7fbf7b', '#1b7837'],
  },
  styl: {
    opacity: 0.8,
    strokeWidth: 2,
  },
  state: { active: true },
};

export default () => {
  const [pointData, SetPointData] = useState({});
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/141ea8df-e674-4ce4-ac91-ee619f411e36.json',
    )
      .then((res) => res.json())
      .then((data) => {
        SetPointData(data);
      });
  }, []);

  const onPointMouseenter = (e: any) => {
    const { DateTime, Magnitude, Source, Depth, Latitude, Longitude } =
      e.feature;
    setInfo({ DateTime, Magnitude, Source, Depth, Latitude, Longitude });
  };

  return (
    <LarkMap {...cofing} style={{ height: '60vh' }}>
      <PointLayer
        {...pointOptions}
        source={{
          data: pointData,
          parser: { type: 'json', x: 'Longitude', y: 'Latitude' },
        }}
        onMouseEnter={(layer) => {
          onPointMouseenter(layer);
        }}
      />
      {info?.Longitude && (
        <Popup
          lngLat={{ lng: info?.Longitude, lat: info?.Latitude }}
          closeButton={false}
          closeOnClick={false}
        >
          <div
            style={{
              width: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            时间：{info.DateTime}
          </div>
          <div style={{ width: 250, overflow: 'hidden' }}>
            深度：{info.Depth}
          </div>
          <div style={{ width: 250, overflow: 'hidden' }}>
            地震强度：{info.Magnitude}
          </div>
          <div style={{ width: 250, overflow: 'hidden' }}>
            数据来源：{info.Source}
          </div>
        </Popup>
      )}
    </LarkMap>
  );
};

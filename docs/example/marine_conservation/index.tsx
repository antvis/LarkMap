import { PointLayer, LarkMap, Popup } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { MapConfig, LayerConfig } from './helper';
import Legend from './Legend';

export default () => {
  const [source, setSource] = useState({ data: [], parse: { type: 'json' } });
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b056dc66-1d43-4167-a11e-9d0ada9cfec8.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          // @ts-ignore
          data: data,
          parser: { type: 'csv', x: 'Longitude', y: 'Latitude' },
        });
      });
  }, []);

  const onPointMouseenter = (e: any) => {
    const { ChineseName, Province, Area, Longitude, Latitude } = e.feature;
    setInfo({ ChineseName, Province, Area, Longitude, Latitude });
  };

  return (
    <LarkMap {...MapConfig} style={{ height: '60vh' }}>
      <Legend />

      <PointLayer
        {...LayerConfig}
        source={source}
        onCreated={(layer) => {
          layer?.on('mouseenter', onPointMouseenter);
        }}
      />
      {info?.Longitude && (
        <Popup
          lngLat={{ lng: info?.Longitude, lat: info?.Latitude }}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom-left"
        >
          <p
            style={{
              width: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            名称：{info.ChineseName}
          </p>
          <p style={{ width: 250, overflow: 'hidden' }}>省份：{info.Province}</p>
          <p style={{ width: 250, overflow: 'hidden' }}>面积：{info.Area}(km2)</p>
        </Popup>
      )}
    </LarkMap>
  );
};

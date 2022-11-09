import { LarkMap, LarkMapProps, PointLayer, Popup } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'GaodeV1',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 6,
  },
};
const layerOptions = {
  shape: 'circle',
  size: {
    field: 'count',
    value: [2, 20],
  },
  color: {
    field: 'count',
    value: [
      'rgba(225,72,72,1)',
      'rgba(255,107,59,1)',
      'rgba(255,221,0,1)',
      'rgba(171,128,79,1)',
      'rgba(118,82,59,1)',
      'rgba(37,86,52,1)',
      'rgba(14,142,137,1)',
      'rgba(43,203,149,1)',
      'rgba(159,180,15,1)',
      'rgba(29,66,194,1)',
      'rgba(36,127,234,1)',
      'rgba(29,158,209,1)',
      'rgba(98,102,129,1)',
      'rgba(177,171,244,1)',
      'rgba(121,29,201,1)',
      'rgba(214,75,192,1)',
    ],
  },
};

export default () => {
  const [pointData, setPointData] = useState([]);
  const [lngLat, setLngLat] = useState({ lng: 120.210792, lat: 30.246026 });
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/6f72e4f7-ac8c-41f6-bcac-9745100083ba.json')
      .then((res) => res.json())
      .then((data) => setPointData(data));
  }, []);

  const onCreated = (layer) => {
    layer.on('mousemove', (e) => setLngLat(e.lngLat));
  };
  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '60vh' }}>
      <PointLayer
        source={{ data: pointData, parser: { type: 'json', x: 'lat', y: 'lng' } }}
        onCreated={onCreated}
        {...layerOptions}
      />
      <Popup lngLat={lngLat} closeButton={false} closeOnClick={false} anchor="bottom-left">
        <p>lat: {lngLat.lat}</p>
        <p>lng: {lngLat.lng}</p>
      </Popup>
    </LarkMap>
  );
};

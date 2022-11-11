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
      '#EBCCFF',
      '#CCB0FF',
      '#AE95FF',
      '#907BFF',
      '#7262FD',
      '#5349E0',
      '#2F32C3',
      '#001BA7',
      '#00068C',
      '#5B8FF9',
      '#B27AD8',
      '#7DAAFF',
      '#CE95F5',
      '#EBB0FF',
      '#FFCCFF',
      '#9661BC',
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

import { LarkMap, Popup } from '@antv/larkmap';
import React, { useState } from 'react';

export default () => {
  const [lngLat, setLngLat] = useState({ lng: 120.210792, lat: 30.246026 });
  const onSceneLoaded = (scene) => {
    scene.on('mousemove', (e) => {
      const { lng, lat } = e.lnglat;
      setLngLat({ lng, lat });
    });
  };

  return (
    <LarkMap
      mapType="Gaode"
      style={{ height: '400px' }}
      onSceneLoaded={onSceneLoaded}
    >
      <Popup
        lngLat={lngLat}
        title={<div>实时展示经纬度</div>}
        closeButton={false}
        closeOnClick={false}
      >
        <div>lat: {lngLat.lat}</div>
        <div>lng: {lngLat.lng}</div>
      </Popup>
    </LarkMap>
  );
};

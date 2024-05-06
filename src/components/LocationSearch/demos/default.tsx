import type { Scene } from '@antv/l7';
import type { LocationSearchOption } from '@antv/larkmap';
import { CustomControl, LarkMap, LocationSearch } from '@antv/larkmap';
import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default () => {
  const [location, setLocation] = useState('');
  const [scene, setScene] = useState<Scene | null>(null);

  // 同步地图中心点至 location 中
  const syncMapCenter = useCallback(() => {
    if (scene) {
      const { lng, lat } = scene.getCenter();
      setLocation(`${lng},${lat}`);
    }
  }, [scene]);

  useEffect(() => {
    if (scene) {
      syncMapCenter();
      scene?.on('moveend', syncMapCenter);
      scene?.on('zoomend', syncMapCenter);
    }
  }, [scene, syncMapCenter]);

  const onChange = (name?: string, item?: LocationSearchOption) => {
    if (item) {
      const { longitude, latitude } = item;
      scene.setZoomAndCenter(16, [longitude, latitude]);
      message.success(`地图移动至 ${name}`);
    }
  };

  return (
    <>
      <LarkMap
        mapType="Gaode"
        style={{ height: '300px' }}
        onSceneLoaded={(newScene) => {
          setScene(newScene);
        }}
      >
        <CustomControl position="topleft">
          <LocationSearch
            searchParams={{
              key: 'b93400c020206bd6865a075036e7f423',
              location,
            }}
            autoFocus
            value={null}
            onChange={onChange}
          />
        </CustomControl>
      </LarkMap>
    </>
  );
};

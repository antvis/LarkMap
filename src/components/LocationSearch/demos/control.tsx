import type { Scene } from '@antv/l7';
import { LocationSearch, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';
import type { LocationSearchOption } from '../types';

export default () => {
  const [scene, setScene] = useState<Scene | null>(null);

  const onChange = (name?: string, location?: LocationSearchOption) => {
    if (location) {
      const { longitude, latitude } = location;
      scene.setZoomAndCenter(16, [longitude, latitude]);
    }
  };

  return (
    <>
      <LocationSearch
        style={{ marginBottom: 8 }}
        searchParams={{
          key: '4892acc9f825e343bcf1e25a56199826',
        }}
        value={null}
        onChange={onChange}
      />
      <LarkMap
        mapType="GaodeV1"
        style={{ height: '300px' }}
        onSceneLoaded={(newScene) => {
          setScene(newScene);
        }}
      />
    </>
  );
};

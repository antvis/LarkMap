import { Scene } from '@antv/l7';
import { AdministrativeAreaSelect, CustomControl, LarkMap } from '@antv/larkmap';
import React, { useState } from 'react';

export default () => {
  const [scene, setScene] = useState<Scene | null>(null);

  const cityClick = (item) => {
    scene.fitBounds(item.bbox);
  };
  const onSelectChange = (item) => {
    scene.fitBounds(item.bbox);
  };

  return (
    <LarkMap
      mapType="Gaode"
      style={{ height: '400px' }}
      onSceneLoaded={(newScene) => {
        console.log(newScene);
        setScene(newScene);
      }}
    >
      <CustomControl position="topleft">
        <AdministrativeAreaSelect cityClick={cityClick} onSelectChange={onSelectChange} />
      </CustomControl>
    </LarkMap>
  );
};

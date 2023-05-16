/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { LarkMap, SyncScene } from '@antv/larkmap';
import React from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <LarkMap
          id="baseScene"
          mapType="Gaode"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图1</h2>
        </LarkMap>
        <SyncScene scenes={sceneArray} />
        <LarkMap
          id="baseScene2"
          mapOptions={{ style: 'dark', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图2</h2>
        </LarkMap>
      </div>
    </div>
  );
};

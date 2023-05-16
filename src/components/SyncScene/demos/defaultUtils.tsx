/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { LarkMap, syncScene } from '@antv/larkmap';
import React from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const clearRef = React.useRef<() => void>();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  const clearSync = () => {
    if (clearRef.current) clearRef.current();
  };
  const addSync = () => {
    clearRef.current = syncScene(sceneArray);
  };

  return (
    <div>
      <button onClick={addSync}>添加场景同步</button>
      <button onClick={clearSync}>清除同步</button>
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <LarkMap
          id="baseUtilsScene"
          mapType="Gaode"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>地图1</h2>
        </LarkMap>
        <LarkMap
          id="baseUtilsScene2"
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

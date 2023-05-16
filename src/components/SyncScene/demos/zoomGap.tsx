/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { LarkMap, SyncScene } from '@antv/larkmap';
import React from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const [zoomGap, setZoomGap] = React.useState<number>();
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };
  const changeHandler = (e) => {
    // 转为 Number 类型
    const gap = Number(e.target.value);
    setZoomGap(gap);
  };

  return (
    <div>
      设置zoomGap： <input onChange={changeHandler} />
      <div style={{ display: 'flex', flexDirection: 'row', height: '300px' }}>
        <SyncScene scenes={sceneArray} options={{ zoomGap: zoomGap }} />
        <LarkMap
          id="gapScene"
          mapType="Gaode"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], zoom: 9 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>主地图</h2>
        </LarkMap>
        <LarkMap
          id="gapScene2"
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

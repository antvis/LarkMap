/**
 * compact: true
 */
import type { Scene } from '@antv/l7';
import { HeatmapLayer, LarkMap, PointLayer, SyncScene } from '@antv/larkmap';
import { useRequest } from 'ahooks';
import React, { useMemo } from 'react';

export default () => {
  const [sceneArray, setSceneArray] = React.useState([]);
  const onSceneLoaded = (scene: Scene) => {
    setSceneArray((oldValue) => [...oldValue, scene]);
  };

  const { data } = useRequest(() =>
    fetch('https://gw.alipayobjects.com/os/basement_prod/513add53-dcb2-4295-8860-9e7aa5236699.json').then((res) =>
      res.json(),
    ),
  );

  const sourc1 = useMemo(
    () => ({
      data: data ?? { type: 'FeatureCollection', features: [] },
      parser: {
        type: 'geojson',
      },
    }),
    [data],
  );

  const sourc2 = useMemo(
    () => ({
      data: data ?? { type: 'FeatureCollection', features: [] },
      parser: {
        type: 'geojson',
      },
      transforms: [
        {
          type: 'hexagon',
          size: 400,
          field: 'h12',
          method: 'sum',
        },
      ],
    }),
    [data],
  );

  if (!data) return null;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <LarkMap
          id="baseScene"
          mapType="Gaode"
          mapOptions={{
            style: 'light',
            center: [114.07737552216226, 22.542656745583486],
            rotation: 90,
            zoom: 12.47985,
          }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>方案 1</h2>
          <PointLayer
            source={sourc1}
            size={{ field: 'h12', value: [2, 5] }}
            shape="circle"
            color={{
              field: 'h12',
              value: ['#094D4A', '#146968', '#1D7F7E', '#289899', '#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E'].reverse(),
            }}
          />
        </LarkMap>
        <SyncScene scenes={sceneArray} />
        <LarkMap
          id="baseScene2"
          mapOptions={{ style: 'light', center: [120.210792, 30.246026], rotation: 90, zoom: 12.47985 }}
          onSceneLoaded={onSceneLoaded}
          style={{ flex: 1 }}
        >
          <h2 style={{ position: 'absolute', left: '10px' }}>方案 2</h2>
          <HeatmapLayer
            source={sourc2}
            shape={'hexagon'}
            style={{ coverage: 0.8, angle: 0 }}
            color={{
              field: 'sum',
              value: ['#094D4A', '#146968', '#1D7F7E', '#289899', '#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E'].reverse(),
            }}
          />
        </LarkMap>
      </div>
    </div>
  );
};

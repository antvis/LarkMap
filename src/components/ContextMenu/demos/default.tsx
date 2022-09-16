import type { Scene } from '@antv/l7';
import { LarkMap, ContextMenu } from '@antv/larkmap';
import React, { useRef } from 'react';

export default () => {
  const map = useRef<AMap.Map>();

  const handleMenu = (type: string) => {
    if (map.current) {
      switch (type) {
        case 'zoomIn':
          map.current.zoomIn();
          break;
        case 'zoomOut':
          map.current.zoomOut();
          break;
        case 'center':
          map.current.setZoomAndCenter(3, [108.946609, 34.262324]);
          break;
      }
    }
  };

  return (
    <LarkMap
      mapType="GaodeV1"
      style={{ height: '400px' }}
      onSceneLoaded={(scene: Scene) => {
        map.current = scene;
        // scene.setMapStyle('dark');
      }}
    >
      <ContextMenu>
        <ContextMenu.Item
          text="放大一级"
          onClick={() => {
            handleMenu('zoomIn');
          }}
        />
        <ContextMenu.Item text="缩小一级" onClick={() => handleMenu('zoomOut')} />
        <ContextMenu.Item text="缩放至全国范围" onClick={() => handleMenu('center')} />
      </ContextMenu>
    </LarkMap>
  );
};

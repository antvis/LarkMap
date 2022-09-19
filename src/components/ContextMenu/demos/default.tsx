import type { Scene } from '@antv/l7';
import { LarkMap, ContextMenu } from '@antv/larkmap';
import React, { useRef } from 'react';

export default () => {
  const mapScene = useRef<Scene>();

  const handleMenu = (type: string) => {
    if (mapScene.current) {
      switch (type) {
        case 'zoomIn':
          mapScene.current.zoomIn();
          break;
        case 'zoomOut':
          mapScene.current.zoomOut();
          break;
        case 'center':
          mapScene.current.setZoomAndCenter(3, [108.946609, 34.262324]);
          break;
      }
    }
  };

  return (
    <LarkMap
      mapType="GaodeV1"
      style={{ height: '400px' }}
      onSceneLoaded={(scene: Scene) => {
        mapScene.current = scene;
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

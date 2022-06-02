import { LarkMap, useScene } from '@antv/larkmap';
import React, { useEffect } from 'react';

const MyComponent = () => {
  const scene = useScene();

  useEffect(() => {
    scene.setMapStyle('dark');
  }, []);

  return null;
};

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <MyComponent />
  </LarkMap>
);

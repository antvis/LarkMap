import { LarkMap, useScene } from '@antv/larkmap';
import React, { useEffect } from 'react';

const ChildComponent = () => {
  const scene = useScene();

  useEffect(() => {
    scene.setMapStyle('dark');
  }, []);

  return null;
};

export default () => (
  <LarkMap mapType="Gaode" style={{ height: '300px' }}>
    <ChildComponent />
  </LarkMap>
);

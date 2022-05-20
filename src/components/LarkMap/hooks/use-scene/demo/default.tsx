import React from 'react';
import { LarkMap, useScene } from '@antv/lark-map';

const MyComponent = () => {
  const scene = useScene();

  return <h1 style={{ position: 'absolute', left: '10px' }}>scene</h1>;
};

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <MyComponent />
  </LarkMap>
);

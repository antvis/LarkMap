import React from 'react';
import { LarkMap, useControl } from '@antv/lark-map';

const MyControl = () => {
  const onCreate = (context: Scene) => {
    const el = document.createElement('h2');
    el.innerHTML = 'My Control';

    return el;
  };

  const onRemove = (context: Scene) => {};

  useControl(onCreate, onRemove, { position: 'topleft' });

  return null;
};

export default () => (
  <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
    <MyControl />
  </LarkMap>
);

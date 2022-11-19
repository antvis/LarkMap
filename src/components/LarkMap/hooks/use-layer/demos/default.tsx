import { BubbleLayer, LarkMap, useLayer } from '@antv/larkmap';
import React, { useEffect } from 'react';
import { layerOptions, source } from './constants';

const MyComponent = () => {
  const myBubbleLayer = useLayer('myBubbleLayer');

  useEffect(() => {
    myBubbleLayer?.fitBounds();
  }, [myBubbleLayer]);

  return null;
};

export default () => {
  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <BubbleLayer {...layerOptions} id="myBubbleLayer" source={source} />
      <MyComponent />
    </LarkMap>
  );
};

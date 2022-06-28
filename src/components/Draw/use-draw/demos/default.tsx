import { LarkMap, useDraw } from '@antv/larkmap';
import React, { useEffect } from 'react';

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 * @constructor
 */
const Draw = () => {
  const { enable, drawData } = useDraw({
    type: 'point',
    options: {},
  });

  useEffect(() => {
    enable();
  }, [enable]);

  useEffect(() => {
    console.log(drawData);
  }, [drawData]);

  return <></>;
};

const Default = () => {
  return (
    <LarkMap
      mapType="GaodeV1"
      mapOptions={{
        style: 'dark',
      }}
      style={{ height: '500px' }}
    >
      <Draw />
    </LarkMap>
  );
};

export default Default;

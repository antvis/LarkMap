import { LarkMap, useDraw } from '@antv/larkmap';
import React, { useEffect } from 'react';

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 */
const CustomDraw = () => {
  const { enable } = useDraw({
    type: 'polygon',
    options: {},
  });

  useEffect(() => {
    enable();
  }, [enable]);

  return null;
};

const Default = () => {
  return (
    <LarkMap
      mapType="Gaode"
      mapOptions={{
        style: 'dark',
        center: [120.11155128479004, 30.24868703665976],
        zoom: 11,
      }}
      style={{ height: '500px' }}
    >
      <CustomDraw />
    </LarkMap>
  );
};

export default Default;

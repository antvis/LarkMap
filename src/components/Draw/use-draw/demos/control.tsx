import { CustomControl, LarkMap, useDraw } from '@antv/larkmap';
import { Button } from 'antd';
import React, { useEffect } from 'react';

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 */
const CustomDraw = () => {
  const { enable, isEnable, disable, drawData } = useDraw({
    type: 'polygon',
    options: {
      areaOptions: {},
      initialData: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [120.10700225830077, 30.258325832889938],
                [120.10228157043457, 30.24586997476859],
                [120.11541366577148, 30.239048240429582],
                [120.1208209991455, 30.25091182187644],
                [120.11240959167479, 30.25662065990906],
                [120.10700225830077, 30.258325832889938],
              ],
            ],
          },
        },
      ],
    },
  });

  useEffect(() => {
    enable();
  }, [enable]);

  useEffect(() => {
    console.log(drawData);
  }, [drawData]);

  return (
    <CustomControl>
      <h2 style={{ color: '#fff' }}>可以通过在地图上点击绘制面</h2>
      <Button disabled={isEnable} onClick={enable} style={{ marginRight: 8 }}>
        启用绘制
      </Button>
      <Button disabled={!isEnable} onClick={disable}>
        禁用绘制
      </Button>
    </CustomControl>
  );
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

import { LarkMap, useDraw } from '@antv/larkmap';
import React, { useEffect } from 'react';

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 */
const Draw = () => {
  const { enable, drawData } = useDraw({
    type: 'polygon',
    options: {
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

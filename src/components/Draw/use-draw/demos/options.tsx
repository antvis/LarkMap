import { LarkMap, useDraw } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

function randomRgbColor() {
  //随机生成RGB颜色
  const r = Math.floor(Math.random() * 256); //随机生成256以内r值
  const g = Math.floor(Math.random() * 256); //随机生成256以内g值
  const b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
}

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 */
const Draw = () => {
  const [color, setColor] = useState(randomRgbColor());
  const { enable } = useDraw({
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
      style: {
        point: {
          normal: {
            color,
          },
          hover: {
            color,
          },
          active: {
            color,
          },
        },
      },
    },
  });

  useEffect(() => {
    enable();
  }, [enable]);

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1
        }}
        onClick={() => {
          setColor(randomRgbColor());
        }}
      >
        变换颜色
      </button>
    </>
  );
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

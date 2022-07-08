import { CustomControl, LarkMap, useDrawGroup } from '@antv/larkmap';
import { useMount } from 'ahooks';
import React, { useEffect } from 'react';
import type { BaseMode } from '@antv/l7-draw';
import styles from './default.less';

/**
 * useDraw 必须在 LarkMap 的子孙组件中调用
 */
const Draw = () => {
  const { activeDraw, setActiveDraw, drawMap, drawGroupData, setDrawGroupData } = useDrawGroup({
    point: {
      initialData: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [120.13875961303712, 30.248984087355694],
          },
        },
      ],
    },
    line: true,
    polygon: true,
  });

  useMount(() => {
    setActiveDraw(drawMap.point);
  });

  useEffect(() => {
    console.log(drawGroupData);
  }, [drawGroupData]);

  const onButtonClick = (currentDraw: BaseMode) => {
    if (activeDraw === currentDraw) {
      setActiveDraw(null);
    } else {
      setActiveDraw(currentDraw);
    }
  };

  return (
    <CustomControl className={styles.control}>
      <button
        className={drawMap.point === activeDraw ? styles.active : ''}
        onClick={() => onButtonClick(drawMap.point)}
      >
        绘制点
      </button>
      <button className={drawMap.line === activeDraw ? styles.active : ''} onClick={() => onButtonClick(drawMap.line)}>
        绘制线
      </button>
      <button
        className={drawMap.polygon === activeDraw ? styles.active : ''}
        onClick={() => onButtonClick(drawMap.polygon)}
      >
        绘制面
      </button>
      <button
        onClick={() => {
          setDrawGroupData({
            point: [],
            line: [],
            polygon: [],
          });
        }}
      >
        清空数据
      </button>
    </CustomControl>
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

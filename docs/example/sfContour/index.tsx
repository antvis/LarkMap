import type { LarkMapProps, LineLayerProps } from '@antv/larkmap';
import { LarkMap, LineLayer } from '@antv/larkmap';
// import type { Scene } from '@antv/l7';
import React, { useEffect, useMemo, useState } from 'react';

/** 线图层属性配置 https://l7plot.antv.vision/zh/docs/api/composite-layers/line-layer/ */
const myLineLayerOptions: Omit<LineLayerProps, 'source'> = {
  id: 'myLineLayer',
  // autoFit: true,
  blend: 'normal',
  shape: 'line',
  color: {
    field: 'elevation',
    value: ['#37535E', '#3A748A', '#4B9A95', '#5EAB8B', '#73BC84', '#92CC8B', '#BEDDA5', '#E5EEc1'],
    scale: {
      type: 'quantize', // 关联字段的映射scale类型：等间距
    },
  },
  size: 0.2,
  style: {
    opacity: 0.8,
    lineType: 'solid',
  },
  state: {
    active: {
      color: '#FFF684',
    },
    select: {
      color: 'red',
    },
  },
};

const SfContour = () => {
  const [lineLayerOptions] = useState(myLineLayerOptions);
  const [source, setSource] = useState({
    data: {
      type: 'FeatureCollection',
      features: [],
    },
    parser: {
      type: 'geojson',
    },
  });

  /** 地图属性配置 */
  const larkMapConfig: LarkMapProps = useMemo(() => {
    return {
      mapType: 'Mapbox',
      mapOptions: {
        style: 'dark',
        pitch: 50,
        zoom: 12.5,
        center: [-122.45397511735388, 37.73927151161908],
        rotation: 30, // 初始旋转角度
      },
      style: {
        height: 700,
      },
      logoPosition: 'bottomleft',
      // onSceneLoaded: (scene: Scene) => {
      // scene.setRotation(30); // 也可以在这里设置旋转角度
      // },
    };
  }, [source]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1ad85b9f-0b57-4e37-ac48-3d8aea9d14b4.json')
      .then((res) => res.json())
      .then((data: any) => {
        setSource((prevState) => {
          return {
            ...prevState,
            data,
          };
        });
      });
  }, []);

  return (
    <LarkMap {...larkMapConfig}>
      <LineLayer {...lineLayerOptions} source={source} />
    </LarkMap>
  );
};

export default SfContour;

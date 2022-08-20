import type { HeatmapLayerStyleAttributeValue, HeatmapLayerProps } from '@antv/larkmap';
import { LarkMap, HeatmapLayer, CustomControl, HeatmapLayerStyleAttribute } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'string', lable: 'c', value: 'c' },
  { type: 'number', lable: 't', value: 't' },
];

const DefaultHeatmapLayerStyle = {
  size: {
    field: 't',
    value: [0, 1],
  },
  style: {
    intensity: 2,
    radius: 30,
    opacity: 1,
    rampColors: {
      colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
      positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    },
  },
};

const heatmapLayerOptions: Omit<HeatmapLayerProps, 'source'> = {
  autoFit: true,
  shape: 'heatmap',
  ...DefaultHeatmapLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(heatmapLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/o1GNZoJ2rK/points-center.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl
        position="topleft"
        style={{
          width: '300px',
          background: '#fff',
          padding: '10px',
        }}
      >
        <h3>属性配置</h3>
        <HeatmapLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultHeatmapLayerStyle}
          fieldList={FieldList}
          onChange={(values: HeatmapLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

import type {
  HeatmapLayerProps,
  HeatmapLayerStyleAttributeValue,
} from '@antv/larkmap';
import {
  CustomControl,
  HeatmapLayer,
  HeatmapLayerStyleAttribute,
  LarkMap,
} from '@antv/larkmap';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', lable: 'c', value: 'c', typeColor: 'green' },
  { type: 'number', lable: 't', value: 't', typeColor: 'gold' },
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
      colors: [
        'rgb(255, 247, 236)',
        'rgb(254, 232, 200)',
        'rgb(253, 212, 158)',
        'rgb(253, 187, 132)',
        'rgb(252, 141, 89)',
        'rgb(239, 101, 72)',
        'rgb(215, 48, 31)',
        'rgb(179, 0, 0)',
        'rgb(127, 0, 0)',
      ].reverse(),
      positions: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal' as const,
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
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/o1GNZoJ2rK/points-center.json',
    )
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

import type { HeatmapLayerStyleAttributeValue } from '@antv/larkmap';
import { LarkMap, HeatmapLayer, CustomControl, HeatmapLayerStyleAttribute } from '@antv/larkmap';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import SourceData from '../../../Layers/BaseLayers/HeatmapLayer/demos/mock.json';

const FieldList = [
  { type: 'string', lable: 'c', value: 'c' },
  { type: 'number', lable: 't', value: 't' },
];

const colorList = [
  'rgb(255, 247, 236)',
  'rgb(254, 232, 200)',
  'rgb(253, 212, 158)',
  'rgb(253, 187, 132)',
  'rgb(252, 141, 89)',
  'rgb(239, 101, 72)',
  'rgb(215, 48, 31)',
  'rgb(179, 0, 0)',
  'rgb(127, 0, 0)',
].reverse();

const layerSource = {
  data: SourceData,
  parser: { type: 'json', x: 'lng', y: 'lat' },
};

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
      colors: colorList,
      positions: colorList.map((_, index) => index / (colorList.length - 1)),
    },
  },
};

const heatmapLayerOptions = {
  autoFit: true,
  shape: 'heatmap',
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultHeatmapLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(heatmapLayerOptions);
  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <HeatmapLayerStyleAttribute
          initialValues={DefaultHeatmapLayerStyle}
          fieldList={FieldList}
          onChange={(values: HeatmapLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

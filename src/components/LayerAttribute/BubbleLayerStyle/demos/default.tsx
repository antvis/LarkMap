import type { BubbleLayerStyleAttributeValue } from '@antv/larkmap';
import { LarkMap, BubbleLayer, CustomControl, BubbleLayerStyleAttribute } from '@antv/larkmap';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import CityWeather from '../../../Layers/BaseLayers/PointLayer/demos/city-weather.json';

const FieldList = [
  { type: 'string', lable: '城市', value: 'name' },
  { type: 'number', lable: '温度', value: 'temperature' },
];
const DefaultBubbleLayerStyle = {
  radius: 40,
  fillColor: '#0f9960',
  opacity: 0.4,
  strokeColor: 'blue',
  lineWidth: 2,
  lineOpacity: 1,
  label: {
    field: 'temperature',
    visible: true,
    style: { fill: '#454d64', fontSize: 18, textAnchor: 'center' },
  },
};

const layerSource = {
  data: CityWeather,
  parser: { type: 'json', x: 'lng', y: 'lat' },
};
const bubbleLayerOptions = {
  autoFit: true,
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultBubbleLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(bubbleLayerOptions);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <BubbleLayerStyleAttribute
          initialValues={DefaultBubbleLayerStyle}
          fieldList={FieldList}
          onChange={(values: BubbleLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <BubbleLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

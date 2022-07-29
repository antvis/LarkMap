import type { BubbleLayerStyleAttributeValue } from '@antv/larkmap';
import { BubbleLayerStyleAttribute } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';

const DefaultBubbleLayerStyle = {
  radius: 20,
  fillColor: 'rgb(239,243,255)',
  opacity: 0.8,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: { style: { fill: 'red', fontSize: 14, textAnchor: 'center' } },
};

const FieldList = [
  { type: 'string', lable: '区县' },
  { type: 'number', lable: '指数' },
  { type: 'coordinatePoint', lable: '坐标点' },
  { type: 'coordinatePolygon', lable: '坐标面' },
];

export default () => {
  return (
    <div style={{ width: '300px', backgroundColor: '#f6f6f6', padding: '10px' }}>
      <h4>属性配置</h4>
      <BubbleLayerStyleAttribute
        initialValues={DefaultBubbleLayerStyle}
        fieldList={FieldList}
        onChange={(values: BubbleLayerStyleAttributeValue) => {
          console.log('values: ', values);
        }}
      />
    </div>
  );
};

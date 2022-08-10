import type { HeatmapLayerStyleAttributeValue } from '@antv/larkmap';
import { HeatmapLayerStyleAttribute } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';

const DefaultHeatmapLayerStyle = {
  size: {
    field: 'log',
    value: [0, 1],
  },
  style: {
    intensity: 3,
    radius: 10,
    opacity: 0.8,
    rampColors: {
      colors: [
        'rgb(247, 251, 255)',
        'rgb(222, 235, 247)',
        'rgb(198, 219, 239)',
        'rgb(158, 202, 225)',
        'rgb(107, 174, 214)',
        'rgb(66, 146, 198)',
        'rgb(33, 113, 181)',
        'rgb(8, 81, 156)',
        'rgb(8, 48, 107)',
      ],
    },
  },
};

const FieldList = [
  { type: 'string', lable: '区县', value: 'country' },
  { type: 'number', lable: '指数', value: 'log' },
];

export default () => {
  return (
    <div style={{ width: '300px', backgroundColor: '#f6f6f6', padding: '10px' }}>
      <h4>属性配置</h4>
      <HeatmapLayerStyleAttribute
        initialValues={DefaultHeatmapLayerStyle}
        fieldList={FieldList}
        onChange={(values: HeatmapLayerStyleAttributeValue) => {
          console.log('values: ', values);
        }}
      />
    </div>
  );
};

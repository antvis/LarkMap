import type { HeatmapLayerStyleAttributeValue } from '@antv/larkmap';
import { HeatmapLayerStyleAttribute } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';

const DefaultHeatmapLayerStyle = {
  shape: 'heatmap',
  color: 'rgb(239,243,255)',
  size: 12,
  style: {
    intensity: 3,
    radius: 20,
    opacity: 1,
  },
};

const FieldList = [
  { type: 'string', lable: '区县' },
  { type: 'number', lable: '指数' },
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

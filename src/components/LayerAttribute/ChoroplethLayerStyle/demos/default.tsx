import type { ChoroplethLayerStyleAttributeValue } from '@antv/larkmap';
import { ChoroplethLayerStyleAttribute } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';

const DefaultChoroplethLayerStyle = {
  fillColor: 'rgb(239,243,255)',
  opacity: 0.8,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: { style: { fill: 'red', fontSize: 18, textAnchor: 'center' } },
};

const FieldList = [
  { type: 'string', lable: '区县' },
  { type: 'number', lable: '指数' },
];

export default () => {
  return (
    <div style={{ width: '300px', backgroundColor: '#f6f6f6', padding: '10px' }}>
      <h4>属性配置</h4>
      <ChoroplethLayerStyleAttribute
        initialValues={DefaultChoroplethLayerStyle}
        fieldList={FieldList}
        onChange={(values: ChoroplethLayerStyleAttributeValue) => {
          console.log('values: ', values);
        }}
      />
    </div>
  );
};

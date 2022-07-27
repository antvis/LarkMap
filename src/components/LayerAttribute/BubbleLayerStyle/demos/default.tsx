import { BubbleLayerStyleAttribute } from '@antv/larkmap';
import React from 'react';
import 'antd/dist/antd.css';

export default () => {
  return (
    <div style={{ width: '300px', backgroundColor: '#f6f6f6', padding: '10px' }}>
      <h4>属性配置</h4>
      <BubbleLayerStyleAttribute
        initialValues={{}}
        fieldList={[
          { type: 'string', lable: '区县' },
          { type: 'number', lable: '指数' },
          { type: 'coordinatePoint', lable: '坐标点' },
          { type: 'polygon', lable: '坐标面' },
        ]}
      />
    </div>
  );
};

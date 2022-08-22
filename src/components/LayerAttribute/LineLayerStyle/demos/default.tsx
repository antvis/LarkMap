import type { LineLayerStyleAttributeValue, LineLayerProps } from '@antv/larkmap';
import { LarkMap, LineLayer, CustomControl, LineLayerStyleAttribute } from '@antv/larkmap';
import React, { useEffect, useMemo, useState } from 'react';
import 'antd/dist/antd.css';

const FieldList = [
  { type: 'string', lable: '名称', value: 'line_name' },
  { type: 'number', lable: 'id', value: 'line_id' },
];
const DefaultLineLayerStyle = {
  size: 1.5,
  color: {
    field: 'line_name',
    value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
  },
  style: {
    opacity: 0.8,
    lineType: 'solid' as const,
  },
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  autoFit: true,
  shape: 'line' as const,
  state: { active: { color: '#FFF684' } },
  ...DefaultLineLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(lineLayerOptions);
  const [layerSource, setLayerSource] = useState({
    data: [],
    parser: { type: 'json', coordinates: 'lnglat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json')
      .then((response) => response.json())
      .then((data: any) => {
        setLayerSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <LineLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultLineLayerStyle}
          fieldList={FieldList}
          onChange={(values: LineLayerStyleAttributeValue) => {
            console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <LineLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

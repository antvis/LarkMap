import type { LineLayerProps, LineLayerStyleAttributeValue } from '@antv/larkmap';
import { CustomControl, LarkMap, LineLayer, LineLayerStyleAttribute } from '@antv/larkmap';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', label: '名称', value: 'line_name', typeColor: 'green', typeName: '文本' },
  { type: 'number', label: 'id', value: 'line_id', typeColor: 'green', typeName: '文本' },
];
const DefaultLineLayerStyle = {
  color: {
    field: 'line_id',
    value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
    scale: { type: 'quantile' as const },
  },
  size: 1.5,
  style: {
    opacity: 0.8,
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal' as const,
  animate: false,
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  autoFit: true,
  shape: 'line',
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
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '16px' }}>
        <h3>属性配置</h3>
        <LineLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultLineLayerStyle}
          fieldList={FieldList}
          onChange={(values: LineLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <LineLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

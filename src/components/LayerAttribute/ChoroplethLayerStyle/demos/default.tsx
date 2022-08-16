import type { ChoroplethLayerStyleAttributeValue, ChoroplethLayerProps } from '@antv/larkmap';
import { LarkMap, ChoroplethLayer, CustomControl, ChoroplethLayerStyleAttribute } from '@antv/larkmap';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import hangezhouGeoJSON from '../../../Layers/BaseLayers/PolygonLayer/demos/hangzhou-district.json';

const FieldList = [
  { type: 'string', lable: '区域名称', value: 'name' },
  { type: 'number', lable: '区域编码', value: 'adcode' },
];
const DefaultChoroplethLayerStyle = {
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: {
    field: 'name',
    visible: true,
    style: { fill: 'blue', fontSize: 18, textAnchor: 'center' as const },
  },
};

const layerSource = {
  data: hangezhouGeoJSON,
  parser: { type: 'geojson' },
};
const choroplethLayerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  state: {
    active: { strokeColor: 'green', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultChoroplethLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(choroplethLayerOptions);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '10px' }}>
        <h3>属性配置</h3>
        <ChoroplethLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultChoroplethLayerStyle}
          fieldList={FieldList}
          onChange={(values: ChoroplethLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <ChoroplethLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

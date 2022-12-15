import { CustomControl, LarkMap, PolygonLayer, useLayerList } from '@antv/larkmap';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { LineLayerOptions, PolygonLayerOptions } from './constants';

const CustomComponent = () => {
  const layerList = useLayerList();

  useEffect(() => {
    console.log(layerList);
  }, [layerList]);

  return (
    <CustomControl>
      <Card bodyStyle={{ padding: '8px 12px' }}>
        <p>当前已有图层：</p>
        <ul>
          {layerList.map((layer) => {
            return <li key={layer.name}>{layer.name}</li>;
          })}
        </ul>
      </Card>
    </CustomControl>
  );
};

export default () => {
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <PolygonLayer name="填充图层" {...PolygonLayerOptions} source={source} />
      <PolygonLayer name="边框图层" {...LineLayerOptions} source={source} />

      <CustomComponent />
    </LarkMap>
  );
};

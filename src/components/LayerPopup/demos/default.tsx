import type { LineLayerProps, PolygonLayerProps } from '@antv/larkmap';
import { LarkMap, LayerPopup, LineLayer, PolygonLayer } from '@antv/larkmap';
import type { FeatureCollection } from '@turf/turf';
import { coordAll, featureCollection, lineString } from '@turf/turf';
import React, { useEffect, useState } from 'react';
import type { LayerPopupProps } from '../types';

const polygonLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  autoFit: true,
  shape: 'fill',
  color: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#477eb8'],
  },
  state: {
    active: true,
  },
  style: {
    opacity: 0.6,
  },
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  shape: 'line',
  color: '#fff',
  size: 4,
};

const items: LayerPopupProps['items'] = [
  {
    layer: 'myPolygonLayer',
    fields: [
      {
        field: 'name',
        formatField: () => '名称',
      },
      {
        field: 'adcode',
        formatField: '行政编号',
      },
    ],
    title: () => '面图层',
  },
  {
    layer: 'myLineLayer',
    title: '线图层',
    customContent: (feature: any) => {
      return (
        <p style={{ color: 'red' }}>
          {feature.properties.name} {feature.properties.adcode}
        </p>
      );
    },
  },
];

export default () => {
  const [polygonSource, setPolygonSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
  });
  const [lineSource, setLineSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
      .then((response) => response.json())
      .then((data: FeatureCollection) => {
        setPolygonSource({ data });
        setLineSource({
          data: featureCollection(data.features.map((item) => lineString(coordAll(item), item))),
        });
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px' }}>
      <PolygonLayer {...polygonLayerOptions} source={polygonSource} id="myPolygonLayer" />
      <LineLayer {...lineLayerOptions} source={lineSource} id="myLineLayer" />
      <LayerPopup closeButton={false} closeOnClick={false} anchor="bottom-left" trigger="hover" items={items} />
    </LarkMap>
  );
};

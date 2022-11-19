import type { PolygonLayerProps } from '@antv/larkmap';
import { LarkMap, PolygonLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<PolygonLayerProps, 'source'> = {
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

export default () => {
  const [options, setOptions] = useState(layerOptions);
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
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <PolygonLayer {...options} source={source} />
    </LarkMap>
  );
};

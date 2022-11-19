import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
  label: {
    field: 'name',
    visible: true,
    style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json',
    )
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <ChoroplethLayer {...options} source={source} />
    </LarkMap>
  );
};

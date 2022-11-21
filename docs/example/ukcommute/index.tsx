import type { LineLayerProps } from '@antv/larkmap';
import { LarkMap, LineLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { config, layerConfig } from './constants';

export default () => {
  const [source, setSource] = useState<LineLayerProps['source']>({
    data: '',
    parser: {
      type: 'csv',
      x: 'workplace_lng',
      y: 'workplace_lat',
      x1: 'residence_lng',
      y1: 'residence_lat',
    },
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/571cfe70-15ca-4542-934a-78f8c95b0bd3.csv',
    )
      .then((res) => res.text())
      .then((data) => {
        setSource({ ...source, data: data });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <LineLayer {...layerConfig} source={source} />
    </LarkMap>
  );
};

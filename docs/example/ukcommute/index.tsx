import { LineLayer, LarkMap, LarkMapProps, LineLayerProps } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { MapConfig, LayerConfig } from './helper';

export default () => {
  const [source, setSource] = useState({ data: [], parse: { type: 'json' } });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/571cfe70-15ca-4542-934a-78f8c95b0bd3.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          // @ts-ignore
          data: data,
          parser: {
            type: 'csv',
            x: 'workplace_lng',
            y: 'workplace_lat',
            x1: 'residence_lng',
            y1: 'residence_lat',
          },
        });
      });
  }, []);

  return (
    <LarkMap {...(MapConfig as LarkMapProps)} style={{ height: '60vh' }}>
      <LineLayer {...(LayerConfig as LineLayerProps)} source={source} />
    </LarkMap>
  );
};

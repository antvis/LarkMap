import type { PointLayerProps } from '@antv/larkmap';
import { LarkMap, LayerPopup, PointLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import { config, layerConfig } from './constants';
import Legend from './Legend';

export default () => {
  const [source, setSource] = useState<PointLayerProps['source']>({
    data: [] as any,
    parser: { type: 'json' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b056dc66-1d43-4167-a11e-9d0ada9cfec8.csv')
      .then((res) => res.text())
      .then((data) => {
        setSource({
          data,
          parser: { type: 'csv', x: 'Longitude', y: 'Latitude' },
        });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <Legend />

      <PointLayer id="customPointLayer" {...layerConfig} source={source} />

      <LayerPopup
        items={[
          {
            layer: 'customPointLayer',
            fields: [
              {
                field: 'ChineseName',
                formatField: '名称',
              },
              {
                field: 'Province',
                formatField: '省份',
              },
              {
                field: 'Area',
                formatField: '面积',
                formatValue: (value) => `${value}(km²)`,
              },
            ],
          },
        ]}
        trigger="hover"
      />
    </LarkMap>
  );
};

import type { LegendItems } from '@antv/l7';
import { ChoroplethLayer, CustomControl, LarkMap, LegendRamp } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'Gaode' as const,
  mapOptions: {
    style: 'light',
    center: [-113.622713, 53.546444],
    zoom: 2.12,
  },
};

const colors = ['#ffd8bf', '#ffbb96', '#ff9c6e', '#ff7a45', '#fa541c', '#d4380d', '#ad2102'];

export default () => {
  const [unemployment, setUnemployment] = useState('');
  const [legendItems, setLegendItems] = useState<LegendItems>([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((res) => setUnemployment(res));
  }, []);

  const Legend = () => {
    if (!legendItems.length) return null;

    const newValue: any = new Set([...legendItems.map((item) => item.value).flat()]);
    return (
      <LegendRamp
        isSegment
        barWidth={250}
        style={{ background: '#fff', padding: 8 }}
        colors={legendItems.map((item) => item.color)}
        labels={[...newValue.map((item) => item.toFixed())]}
      />
    );
  };

  return (
    <LarkMap {...(config as any)} style={{ height: 500 }}>
      {unemployment && (
        <ChoroplethLayer
          source={{
            data: unemployment,
          }}
          fillColor={{
            field: 'unemployment_rate',
            value: colors,
            scale: { type: 'quantile', domain: [3, 20] },
          }}
          onCreated={(l) => {
            setLegendItems(l.getLegend('color').items);
          }}
        />
      )}
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
    </LarkMap>
  );
};

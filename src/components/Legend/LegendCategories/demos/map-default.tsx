import { CustomControl, LarkMap, ChoroplethLayer, LegendCategories } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'GaodeV1' as const,
  mapOptions: {
    style: 'light',
    center: [-100.45397511735388, 37.73927151161908],
    zoom: 4,
  },
};

const colors = [
  'rgb(247, 144, 124)',
  'rgb(231, 225, 239)',
  'rgb(212, 185, 218)',
  'rgb(201, 148, 199)',
  'rgb(223, 101, 176)',
  'rgb(231, 41, 138)',
  'rgb(206, 18, 86)',
  'rgb(152, 0, 67)',
  'rgb(103, 0, 31)',
];

export default () => {
  const [unemployment, setUnemployment] = useState('');
  const [legendItems, setLegendItems] = useState<any>([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json')
      .then((res) => res.json())
      .then((res) => setUnemployment(res));
  }, []);

  const Legend = () => {
    if (!legendItems.length) return null;
    return (
      <LegendCategories
        style={{ background: '#fff', padding: 8 }}
        colors={legendItems.map((item: any) => item.color)}
        labels={legendItems.map((item: any) => item.value)}
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
          state={{
            select: true,
          }}
          fillColor={{
            field: 'LSAD',
            value: colors,
            scale: { type: 'cat' },
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

import type { LegendItems } from '@antv/larkmap';
import {
  CustomControl,
  IconImageLayer,
  LarkMap,
  LegendIcon,
} from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'Gaode' as const,
  mapOptions: {
    style: 'light',
    center: [119.94992, 29.80872] as [number, number],
    zoom: 4,
  },
};

const iconAtlas = {
  icon1:
    'https://gw.alipayobjects.com/zos/bmw-prod/bac5245e-7900-4b0a-97fd-dfe6ff28fdd3.svg',
  icon2:
    'https://gw.alipayobjects.com/zos/bmw-prod/1b95f75d-e1b2-4ffe-a412-2ef745286c29.svg',
  icon3:
    'https://gw.alipayobjects.com/zos/bmw-prod/3ae8e112-54ec-4991-9590-b68db49db45a.svg',
  icon4:
    'https://gw.alipayobjects.com/zos/bmw-prod/714a8da0-a8cd-4330-84c0-042a0aff3a6f.svg',
  icon5:
    'https://gw.alipayobjects.com/zos/bmw-prod/e8f6a39d-e8f3-40a2-91cc-50711f223b9a.svg',
  icon6:
    'https://gw.alipayobjects.com/zos/bmw-prod/91754094-7b70-4649-a8b8-df46cc286bef.svg',
};

const iconImageCfg = {
  autoFit: true,
  icon: {
    field: 'type',
    value: ['icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6'],
  },
  radius: {
    field: 'value',
    value: [15, 20],
  },
  iconAtlas,
  opacity: 1,
};

export default () => {
  const [pointData, setPointData] = useState([]);
  const [legendItems, setLegendItems] = useState<LegendItems[]>([]);

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/4e466b25-1782-4772-8ec4-8af6f1289044.json',
    )
      .then((res) => res.json())
      .then((res) => {
        const result = res.features.map(({ properties, geometry }) => {
          return {
            ...properties,
            type: ['健身房', '公共厕所', '超市', '邮件', '餐厅', '休息吧'][
              Math.floor(Math.random() * 6)
            ],
            lng: geometry.coordinates[0][0],
            lat: geometry.coordinates[0][1],
          };
        });
        setPointData(result);
      });
  }, []);

  const Legend = () => {
    if (legendItems.length === 0) {
      return null;
    }
    const labels = legendItems.map((item) => item.value);
    const icons = legendItems.map((item) => iconAtlas[item.shape]);
    return (
      <LegendIcon
        style={{ background: '#fff', padding: 8 }}
        labels={labels}
        icons={icons}
      />
    );
  };

  return (
    <LarkMap {...config} style={{ height: 500 }}>
      {pointData.length && (
        <IconImageLayer
          source={{
            data: pointData,
            parser: { type: 'json', x: 'lng', y: 'lat' },
          }}
          {...iconImageCfg}
          onCreated={(l) => {
            setLegendItems(l.getLegend('shape').items);
          }}
        />
      )}
      <CustomControl position="bottomleft">
        <Legend />
      </CustomControl>
    </LarkMap>
  );
};

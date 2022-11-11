import type { IconImageLayerProps } from '@antv/larkmap';
import { IconImageLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<IconImageLayerProps, 'source'> = {
  autoFit: true,
  iconAtlas: {
    icon1: 'https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg',
    icon2: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
  },
  icon: 'icon1',
  radius: {
    field: 'unit_price',
    value: [1, 20],
  },
  opacity: 1,
  label: {
    field: 'name',
    state: {
      active: {
        color: 'blue',
      },
    },
    style: {
      fill: '#54ccc9',
      opacity: 0.6,
      fontSize: 12,
      textAnchor: 'top',
      textOffset: [0, -30],
      spacing: 1,
      padding: [5, 5],
      stroke: '#ffffff',
      strokeWidth: 0.3,
      strokeOpacity: 1.0,
    },
  },

  state: {
    active: true,
    select: {
      radius: 20,
      opacity: 1,
      icon: 'icon2',
    },
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'longitude', y: 'latitude' },
  });

  const geojsontojson = (data) => {
    return data?.features.map((item) => {
      return { ...item.properties, ...item.geometry };
    });
  };

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/bc5f49d2-cdde-4a56-a233-b1c227dd0b09.json')
      .then((response) => response.json())
      .then((data) => {
        setSource((prevState) => ({ ...prevState, data: geojsontojson(data) }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '60vh' }}>
      <IconImageLayer {...options} source={source} />
    </LarkMap>
  );
};

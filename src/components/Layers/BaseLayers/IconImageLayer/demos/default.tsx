import type { IconImageLayerProps } from '@antv/larkmap';
import { IconImageLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<IconImageLayerProps, 'source'> = {
  autoFit: true,
  iconAtlas: {
    icon1: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
  },
  icon: 'icon1',
  radius: {
    field: 'unit_price',
    value: [1, 20],
  },
  opacity: 1,
  state: {
    active: false,
    select: {
      radius: 20,
      opacity: 1,
    },
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'longitude', y: 'latitude' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <IconImageLayer {...options} source={source} />
    </LarkMap>
  );
};

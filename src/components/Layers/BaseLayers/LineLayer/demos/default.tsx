import type { LineLayerProps } from '@antv/larkmap';
import { LarkMap, LineLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<LineLayerProps, 'source'> = {
  autoFit: true,
  shape: 'line' as const,
  size: 1.5,
  color: {
    field: 'line_name',
    value: ['#5B8FF9', '#5CCEA1', '#5D7092'],
  },
  state: { active: { color: '#FFF684' } },
  style: {
    opacity: 0.8,
    lineType: 'solid' as const,
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', coordinates: 'lnglat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <LineLayer {...options} source={source} />
    </LarkMap>
  );
};

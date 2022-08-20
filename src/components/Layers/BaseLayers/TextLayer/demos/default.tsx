import type { TextLayerProps } from '@antv/larkmap';
import { LarkMap, TextLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<TextLayerProps, 'source'> = {
  autoFit: true,
  field: 'text',
  style: {
    fill: 'red',
    opacity: 1,
    fontSize: 18,
    stroke: '#fff',
    strokeWidth: 2,
    textAllowOverlap: false,
    padding: [5, 5] as [number, number],
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'j', y: 'w' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/rmsportal/oVTMqfzuuRFKiDwhPSFL.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({
          ...prevState,
          data: data.list.map((item) => ({ ...item, text: `${item.m} ${item.t}` })),
        }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <TextLayer {...options} source={source} />
    </LarkMap>
  );
};

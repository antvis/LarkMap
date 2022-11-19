import type { TextLayerProps } from '@antv/larkmap';
import { LarkMap, TextLayer } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<TextLayerProps, 'source'> = {
  autoFit: true,
  field: 'text',
  style: {
    fill: {
      field: 't',
      value: [
        '#ffba08',
        '#faa307',
        '#f48c06',
        '#e85d04',
        '#dc2f02',
        '#d00000',
        '#9d0208',
        '#6a040f',
        '#370617',
        '#03071e',
      ],
    },
    opacity: 1,
    fontSize: 18,
    stroke: '#fff',
    strokeWidth: 2,
    textAllowOverlap: false,
    padding: [10, 10] as [number, number],
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
          data: data.list.map((item) => ({
            ...item,
            text: `${item.m} ${item.t}`,
          })),
        }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '300px' }}>
      <TextLayer {...options} source={source} />
    </LarkMap>
  );
};

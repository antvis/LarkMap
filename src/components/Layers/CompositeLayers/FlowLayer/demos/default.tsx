import type { FlowLayerProps } from '@antv/larkmap';
import { FlowLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

export default () => {
  const [source, setSource] = useState<FlowLayerProps['source']>({
    data: [],
    parser: {
      type: 'json',
      x: 'f_lon',
      y: 'f_lat',
      x1: 't_lon',
      y1: 't_lat',
      weight: 'weight',
    },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f4f3e99a-1d6c-4ab0-b08f-ec730c576b62.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap
      mapType="Gaode"
      mapOptions={{
        style: 'dark',
        center: [121.473471, 31.21707],
        zoom: 10,
      }}
      style={{ height: '50vh' }}
    >
      {source.data.length !== 0 && (
        <FlowLayer
          source={source}
          onCircleLayerClick={(e) => console.log('circle layer click', e)}
          onLineLayerClick={(e) => console.log('line layer click', e)}
        />
      )}
    </LarkMap>
  );
};

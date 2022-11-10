import type { ImageLayerProps } from '@antv/larkmap';
import { LarkMap, ImageLayer } from '@antv/larkmap';
import React, { useState } from 'react';

const layerOptions: Omit<ImageLayerProps, 'source'> = {
  autoFit: true,
  style: {
    opacity: 0.8,
  },
};

export default () => {
  const [options, setOptions] = useState(layerOptions);
  const [source, setSource] = useState({
    data: 'https://gw.alipayobjects.com/zos/rmsportal/FnHFeFklTzKDdUESRNDv.jpg',
    parser: {
      type: 'image',
      extent: [121.168, 30.2828, 121.384, 30.4219],
    },
  });

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <ImageLayer {...options} source={source} />
    </LarkMap>
  );
};

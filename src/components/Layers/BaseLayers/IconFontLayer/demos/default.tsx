import type { IconFontLayerProps } from '@antv/larkmap';
import { IconFontLayer, LarkMap } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const layerOptions: Omit<IconFontLayerProps, 'source'> = {
  autoFit: true,
  iconAtlas: {
    fontFamily: 'iconfont',
    fontPath: '//at.alicdn.com/t/font_2534097_ao9soua2obv.woff2?t=1622021146076',
    iconFonts: [
      ['smallRain', '&#xe6f7;'],
      ['middleRain', '&#xe61c;'],
      ['hugeRain', '&#xe6a6;'],
      ['sun', '&#xe6da;'],
      ['cloud', '&#xe8da;'],
    ],
  },
  icon: {
    field: 'iconType',
    value: 'text',
  },
  iconStyle: {
    textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
    textOffset: [10, 10], // 文本相对锚点的偏移量 [水平, 垂直]
    fontFamily: 'iconfont',
    textAllowOverlap: true,
    iconfont: true,
  },
  fillColor: 'blue',
  radius: 20,
  opacity: 0.7,
  state: {
    active: {
      color: 'red',
    },
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
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/9eb3f1b5-0c3b-49b2-8221-191d4ba8aa5e.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="GaodeV1" style={{ height: '300px' }}>
      <IconFontLayer {...options} source={source} />
    </LarkMap>
  );
};

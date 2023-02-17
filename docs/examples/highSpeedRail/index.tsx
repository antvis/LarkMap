import type { LarkMapProps, LayerPopupProps, PointLayerProps } from '@antv/larkmap';
import { LarkMap, LayerPopup, PointLayer, ScaleControl, ZoomControl } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    zoom: 4,
  },
  logoPosition: 'bottomleft',
};

const items: LayerPopupProps['items'] = [
  {
    layer: 'PolygonLayer',
    fields: [
      {
        field: 'province',
        formatField: '省份',
      },
      {
        field: 'busStop',
        formatField: '城市',
      },
      {
        field: 'address',
        formatField: '站点',
      },
      {
        field: 'lng',
        formatField: '经纬度',
      },
      {
        field: 'lat',
        formatField: '维度',
      },
    ],
  },
];

const pointLayerProps: Omit<PointLayerProps, 'source'> = {
  id: 'myPointLayer',
  shape: 'circle',
  size: 7,
  color: {
    field: 'address',
    value: ['#34B6B7', '#CEF8D6'],
  },
  state: {
    active: {
      color: 'pink', // 设置鼠标划过点的颜色
    },
  },
  autoFit: true,
  style: {
    opacity: 0.7,
  },
  blend: 'normal', // 图层元素混合效果 https://antv-l7.gitee.io/zh/docs/api/base#blend
};

export default () => {
  const [data, setData] = useState({
    data: [],
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat',
    },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/d5ec85b7-3ac6-4987-924a-3952d7e31bcb.json')
      .then((res) => res.json())
      .then((dataArr) => {
        setData({ ...data, data: dataArr });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer {...pointLayerProps} source={data} id="PolygonLayer" />
      <ScaleControl />
      <ZoomControl />
      <LayerPopup
        closeButton={false}
        closeOnClick={false}
        anchor="bottom-left"
        title={<div>图层数据</div>}
        trigger="hover"
        items={items}
      />
    </LarkMap>
  );
};

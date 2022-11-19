import type { PointLayerProps } from '@antv/larkmap';
import { LarkMap, LayerPopup, PointLayer, Scale, Zoom } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

interface IdataType {
  province: string;
  busStop: string;
  address: string;
  lng: string;
  lat: string;
  WGS84lng: string;
  WGS84lat: string;
}

const config = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    zoom: 4,
    minZoom: 5,
    maxZoom: 9,
  },
  logoPosition: 'bottomleft',
};

const items = [
  {
    layer: 'PolygonLayer',
    fields: [
      {
        field: 'province',
        formatField: () => '省份',
      },
      {
        field: 'busStop',
        formatField: () => '城市',
      },
      {
        field: 'address',
        formatField: () => '站点',
      },
      {
        field: 'lng',
        formatField: () => '经纬度',
      },
      {
        field: 'lat',
        formatField: () => '维度',
      },
    ],
  },
];

const pointLayerOptions: PointLayerProps = {
  id: 'myPoitLayer',
  // autoFit: true, // 设置完数据后自动将点图层放大到视口范围位置
  // shape: {
  //   field: 'address',
  //   value: 'text', // 以文本形式展示
  // },
  /* 
      若是使用简单的圆点图层，建议使用 simple 代替 circle 以获得更好的性能，
      注意：circle 与 simple 样式有所不同
      文档参考：https://antv-l7.gitee.io/zh/docs/api/point_layer/pointlayer#shape
    */
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
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/d5ec85b7-3ac6-4987-924a-3952d7e31bcb.json',
    )
      .then((res) => res.json())
      .then((dataArr) => {
        setData({ ...data, data: dataArr });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <PointLayer {...pointLayerOptions} source={data} name="PolygonLayer" />
      <Scale position='bottomleft' />
      <Zoom position='bottomright' />
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

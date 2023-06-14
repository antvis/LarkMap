import type { FlowLayerProps } from '@antv/larkmap';
import { FlowLayer, LarkMap, useScene } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

const trafficFlowLayerOptions: Omit<FlowLayerProps, 'source'> = {
  // 客流点聚合类型
  clusterType: 'HCA',
  // zoom 计算步长
  clusterZoomStep: 1,
  // 聚合点像素尺寸
  clusterNodeSize: 64,
  // 聚合半径
  clusterRadius: 40,
  // 聚合力度
  clusterExtent: 512,
  // 最大展示的客流线条数
  maxTopFlowNum: 5000,
  color: '#fff',
  zoom: 12,
  radius: {
    field: 'weight',
    value: [1, 16],
  },
  lineColor: {
    field: 'weight',
    value: ['orange', 'red'],
  },
  lineSize: {
    field: 'weight',
    value: [1, 16],
  },
  // 是否启用根据权重映射半透明值
  fadeOpacityEnabled: true,
  // 半透明的权重
  fadeOpacityAmount: 0,
  state: {
    select: { strokeColor: 'pink', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

const parser = {
  type: 'json',
  x: 'f_lon',
  y: 'f_lat',
  x1: 't_lon',
  y1: 't_lat',
  weight: 'weight',
};

const FlowLayers = ({ sourceData }: { sourceData: Record<string, any> }) => {
  const scene = useScene();

  useEffect(() => {
    const { f_lon, f_lat } = sourceData[sourceData.length / 2];
    if (scene) {
      scene.setCenter([+f_lon, +f_lat]);
    }
  }, [scene, sourceData]);

  return <FlowLayer {...trafficFlowLayerOptions} source={{ data: sourceData, parser }} />;
};

export default () => {
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f4f3e99a-1d6c-4ab0-b08f-ec730c576b62.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSourceData(data);
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '50vh' }}>
      {sourceData.length !== 0 && <FlowLayers sourceData={sourceData} />}
    </LarkMap>
  );
};

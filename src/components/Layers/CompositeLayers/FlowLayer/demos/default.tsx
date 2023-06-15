import { FlowLayer, LarkMap, useScene } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';

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

  return <FlowLayer source={{ data: sourceData, parser }} />;
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
    <LarkMap
      mapType="Gaode"
      mapOptions={{
        style: 'dark',
      }}
      style={{ height: '50vh' }}
    >
      {sourceData.length !== 0 && <FlowLayers sourceData={sourceData} />}
    </LarkMap>
  );
};

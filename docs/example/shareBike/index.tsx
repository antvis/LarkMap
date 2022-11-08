import {
    LarkMap,
    LarkMapProps,
    PointLayer,
    PointLayerProps,
    PolygonLayer,
    PolygonLayerProps,
  } from '@antv/larkmap';
  import React, { useEffect, useState } from 'react';
  
  export default () => {
    const [pointData, setPointData] = useState({
      data: [],
      parser: { type: 'geojson' },
      cluster: true,
      clusterOption: {
        radius: 5,
      },
    });
    const [PolygonData, setPolygonData] = useState({
      data: [],
      parser: { type: 'geojson' },
    });
    const config = {
      mapType: 'GaodeV2',
      mapOptions: {
        style: 'dark',
        center: [120.210792, 30.246026],
        zoom: 0,
      },
    };
  
    const fetchPointData = async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/b75db584-b143-491d-83cc-cb45653cd4ed.json',
      );
      const result = await res.json();
      setPointData({ ...pointData, data: result });
    };
  
    const fetchPolygonData = async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/163c9fbb-546f-407e-beb1-cc48fdfc2613.json',
      );
      const result = await res.json();
      setPolygonData({ ...PolygonData, data: result });
    };
  
    const layerOptions = {
      autoFit: true,
      shape: 'circle',
      size: {
        field: 'point_count',
        value: [15, 20, 25, , 30, 35],
      },
      blend: 'normal',
      color: 'rgb(153,52,4)',
    };
    const layerOptionpoint = {
      autoFit: false,
      shape: { field: 'point_count', value: 'text' },
      size: 15,
      color: '#fff',
      style: {
        opacity: 1,
        strokeWidth: 0,
        stroke: '#fff',
      },
    };
  
    const layerOption = {
      autoFit: true,
      shape: 'fill',
      color: '#477eb8',
      state: {
        active: true,
      },
      style: {
        opacity: 0.6,
      },
    };
    useEffect(() => {
      fetchPointData();
      fetchPolygonData();
    }, []);
  
    return (
      <LarkMap {...(config as LarkMapProps)} style={{ height: '700px' }}>
        <PointLayer {...(layerOptions as unknown as PointLayerProps)} source={pointData} />
        <PointLayer {...(layerOptionpoint as unknown as PointLayerProps)} source={pointData} />
        <PolygonLayer {...(layerOption as unknown as PolygonLayerProps)} source={PolygonData} />
      </LarkMap>
    );
  };
  
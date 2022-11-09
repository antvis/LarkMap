import {
    ChoroplethLayer,
    ChoroplethLayerProps,
    LarkMap,
    LarkMapProps,
    PointLayer,
    PointLayerProps,
  } from '@antv/larkmap';
  import { polygon } from '@turf/turf';
  import { cellToBoundary, latLngToCell } from 'h3-js';
  import React, { useEffect, useState } from 'react';
  
  export default () => {
    const [PonitData, setPointData] = useState({
      data: [],
      parser: { type: 'json', x: 'center_lon', y: 'center_lat' },
    });
    const [polygonData, setPolygonData] = useState<any>({
      type: 'FeatureCollection',
      features: [],
    });
  
    const config = {
      mapType: 'GaodeV2',
      mapOptions: {
        style: 'normal',
        center: [120.210792, 30.246026],
        zoom: 0,
      },
    };
  
    const layerOptions = {
      autoFit: true,
      shape: 'circle',
      size: 4,
      opacity: 0.4,
      blend: 'normal',
      color: {
        field: 'roll_totalvalue',
        value: [
          'rgb(102,37,6)',
          'rgb(153,52,4)',
          'rgb(204,76,2)',
          'rgb(236,112,20)',
          'rgb(254,153,41)',
          'rgb(254,196,79)',
          'rgb(254,227,145)',
        ],
      },
    };
    useEffect(() => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/2dfb73f7-df5a-46e5-9037-846c481d9e45.json')
        .then((res) => res.json())
        .then((data) => setPointData({ ...PonitData, data }));
    }, []);
  
    useEffect(() => {
      const pointList = PonitData.data.map((item: any) => {
        return [+item.center_lon, +item.center_lat];
      });
      const ponintFilter = pointList.filter((item) => {
        return item[0] && item[1];
      });
      const cell = ponintFilter.map((item) => {
        return latLngToCell(item[1], item[0], 7);
      });
      const polygonSet = [...new Set(cell)];
      const polygonList = polygonSet.map((item) => {
        return cellToBoundary(item, true);
      });
      const polygonDatas = polygonList.map((item) => {
        return polygon([item]);
      });
      setPolygonData({ ...polygonData, features: polygonDatas });
    }, [PonitData]);
  
    const layerOption = {
      autoFit: true,
      fillColor: '#377eb8',
      opacity: 0.4,
      strokeColor: '#fff',
      lineWidth: 1,
      state: {
        active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
        select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
      },
    };
  
    return (
      <LarkMap {...(config as LarkMapProps)} style={{ height: '700px' }}>
        <PointLayer {...(layerOptions as unknown as PointLayerProps)} source={PonitData} />
        <ChoroplethLayer
          {...(layerOption as unknown as ChoroplethLayerProps)}
          source={{ data: polygonData, parser: { type: 'geojson' } }}
        />
      </LarkMap>
    );
  };
  
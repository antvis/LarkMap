import { ChoroplethLayer, LarkMap } from '@antv/larkmap';
import { polygon } from '@turf/turf';
import { cellToBoundary, latLngToCell } from 'h3-js';
import React, { useEffect, useState } from 'react';

const config = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [120.210792, 30.246026],
    zoom: 0,
  },
};

const layerOption = {
  autoFit: true,
  fillColor: '#5B8FF9',
  opacity: 0.6,
  strokeColor: '#fff',
  lineWidth: 1,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

export default () => {
  const [PonitData, setPointData] = useState({
    data: [],
    parser: { type: 'json', x: 'center_lon', y: 'center_lat' },
  });
  const [polygonData, setPolygonData] = useState<any>({
    type: 'FeatureCollection',
    features: [],
  });

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/2dfb73f7-df5a-46e5-9037-846c481d9e45.json',
    )
      .then((res) => res.json())
      .then((data) => {
        setPointData({ ...PonitData, data: data.slice(0, 100000) });
      });
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

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <ChoroplethLayer
        {...layerOption}
        source={{ data: polygonData, parser: { type: 'geojson' } }}
      />
    </LarkMap>
  );
};

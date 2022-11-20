import type { ILngLat } from '@antv/l7';
import type {
  ChoroplethLayerProps,
  LarkMapProps,
  PopupProps,
} from '@antv/larkmap';
import { ChoroplethLayer, LarkMap, Popup, Scale, Zoom } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { colorArr } from './utils';

interface IpopInfo {
  NAME?: string;
  ALAND?: number;
  unemployment_rate?: number;
  LSAD?: string;
  AWATER?: number;
}

/** 地图属性配置 */
const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    pitch: 0,
    zoom: 3.7,
    center: [-97.39054553110171, 39.448335349067435],
  },
  logoPosition: 'bottomleft',
};

const ChoroplethLayerOptions: ChoroplethLayerProps = {
  id: 'unemploymentRateLayer',
  // autoFit: true,
  fillColor: {
    field: 'unemployment_rate',
    value: colorArr,
    scale: {
      type: 'quantile',
    },
  },
  opacity: 0.8,
  // strokeColor: 'orange',
  lineWidth: 0.2,
  lineOpacity: 1,
  state: {
    active: { strokeColor: 'orange', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
  label: {
    field: 'NAME',
    visible: false,
    style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
  },

  blend: 'normal',
};

/** 信息框属性配置 */
const popupProps: PopupProps = {
  className: styles['popup-area'],
  closeButton: false,
  closeOnClick: false,
  anchor: 'bottom',
};

export default () => {
  const [lngLat, setLngLat] = useState<ILngLat>({
    lng: -97.39054553110171,
    lat: 39.448335349067435,
  });
  const [popInfo, setPopINfo] = useState<IpopInfo>({
    NAME: 'Cloud',
    ALAND: 1852726628,
    unemployment_rate: 4.4,
    LSAD: '06',
    AWATER: 6859887,
  });
  const [choroplethdata, setChoroplethData] = useState({
    data: {},
    parser: { type: 'geojson' },
  });

  const enterFn = (featureInfo: any) => {
    setLngLat(featureInfo.lngLat);
    setPopINfo({
      NAME: featureInfo.feature.properties.NAME,
      ALAND: featureInfo.feature.properties.ALAND,
      unemployment_rate: featureInfo.feature.properties.unemployment_rate,
      LSAD: featureInfo.feature.properties.LSAD,
      AWATER: featureInfo.feature.properties.AWATER,
    });
  };

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/9ae0f4f6-01fa-4e08-8f19-ab7ef4548e8c.json',
    )
      .then((res) => res.json())
      .then((dataArr) => {
        setChoroplethData({ ...choroplethdata, data: dataArr });
      });
  }, []);

  return (
    <LarkMap {...config} style={{ height: '60vh' }}>
      <ChoroplethLayer
        {...ChoroplethLayerOptions}
        source={choroplethdata}
        onMouseMove={(layer) => {
          enterFn(layer);
        }}
      />
      <Popup {...popupProps} lngLat={lngLat}>
        <div>
          <div className={styles['title-area']}>Counties-Unemployment</div>
          <ul className={styles['ul-style']}>
            {Object.keys(popInfo)?.map((key: string, index: number) => {
              return (
                <li key={key}>
                  <div>{key}</div>
                  <div>{Object.values(popInfo)[index]}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </Popup>
      <Scale position="bottomleft" />
      <Zoom position="bottomright" />
    </LarkMap>
  );
};

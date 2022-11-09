import { ILngLat } from '@antv/l7';
import type { LarkMapProps, PolygonLayerProps } from '@antv/larkmap';
import { LarkMap, PolygonLayer, Popup, PopupProps, Scale, Zoom } from '@antv/larkmap';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const CountyUnemployment = () => {
  const [lngLat, setLngLat] = useState<ILngLat>();
  const [popInfo, setPopINfo] = useState<Record<string, string>>({});
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f93cbf2a-76c7-45e0-8fd5-89f1bd4a974b.json')
      .then((res) => res.json())
      .then((dataJson) => {
        setData(dataJson);
      });
  }, []);

  /** 地图属性配置 */
  const config: LarkMapProps = {
    mapType: 'GaodeV1',
    mapOptions: {
      style: 'normal',
      pitch: 0,
      zoom: 8.065670701339682,
      center: [-80.00072773620316, 40.381035150924674],
    },
    logoPosition: 'bottomleft',
  };

  /** 面图层属性配置 */
  const layerOptions: PolygonLayerProps = {
    id: 'movement_pittsburgh',
    // autoFit: true,
    shape: 'fill',
    color: {
      field: 'total_duration',
      value: [
        '#00939C',
        '#2FA7AE',
        '#5DBABF',
        '#8CCED1',
        '#BAE1E2',
        '#F8C0AA',
        '#EB9C80',
        '#DD7755',
        '#D0532B',
        '#C22E00',
      ],
      scale: {
        type: 'quantile',
      },
    },
    state: {
      active: {
        color: 'orange',
      },
    },
    style: {
      opacity: 0.8,
    },
    blend: 'normal',
    source: {
      data: data,
      parser: { type: 'geojson' },
    },
    onCreated: (layer) => {
      layer?.on('click', enterFunction);
    },
  };

  const enterFunction = (featureInfo: any) => {
    setLngLat(featureInfo.lngLat);
    setPopINfo({
      column_0: featureInfo.feature.properties.column_0,
      dstid: featureInfo.feature.properties.dstid,
      sourceid: featureInfo.feature.properties.sourceid,
      day: featureInfo.feature.properties.day,
      total_records: featureInfo.feature.properties.total_records,
    });
  };
  /** 信息框属性配置 */
  const popupProps: PopupProps = {
    className: styles['popup-area'],
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
    lngLat: lngLat,
  };

  return (
    <div style={{ display: 'flex', flex: 1, height: '60vh' }}>
      <LarkMap {...config}>
        <PolygonLayer {...layerOptions} />
        <Popup {...popupProps}>
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
        <Scale position={'bottomleft'} />
        <Zoom position={'bottomright'} />
      </LarkMap>

      <LarkMap {...config}>
        <PolygonLayer {...layerOptions} />
        <Popup {...popupProps}>
          <div>
            <div className={styles['title-area']}>travel-times</div>
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
        <Scale position={'bottomleft'} />
        <Zoom position={'bottomright'} />
      </LarkMap>
    </div>
  );
};

export default CountyUnemployment;

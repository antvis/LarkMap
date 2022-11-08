import { LarkMap, LarkMapProps, PolygonLayer, Popup } from '@antv/larkmap';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import HousePrice from './content';

export default () => {
  const [source, setSource] = useState([]);
  const [selectLabel, setSelectLabel] = useState<undefined | { value: string; label: string }>(undefined);
  const [popup, setPopup] = useState();
  const [selectSource, setSelectSource] = useState([]);

  document.onkeydown = function (event) {
    if (event.keyCode == 27) {
      setSelectLabel(undefined);
    }
  };

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/bc5f49d2-cdde-4a56-a233-b1c227dd0b09.json')
      .then((res) => res.json())
      .then((data) => setSource(data))
      .then(() => {
        message.info('点击图例可更换数据');
      });
  }, []);

  const config = {
    mapOptions: {
      // style: 'normal',
      center: [116.393722, 39.920746],
      zoom: 8,
    },
  };

  const pointLayerOption = {};
  const polygonLayerOption = {
    color: selectLabel
      ? selectLabel.value
      : {
          field: 'count',
          scale: { type: 'quantile' },
          value: [
            'rgb(166, 206, 227)',
            'rgb(31, 120, 180)',
            'rgb(178, 223, 138)',
            'rgb(51, 160, 44)',
            'rgb(251, 154, 153)',
            'rgb(227, 26, 28)',
          ],
        },
    state: {
      active: { color: 'yellow' },
    },
  };

  useEffect(() => {
    if (selectLabel && source) {
      const newSelect = source.features.filter((item) => {
        const [min, max] = selectLabel.label.split(' 到 ');
        return +min < item.properties.count && item.properties.count < +max;
      });
      setSelectSource(newSelect);
    }
  }, [selectLabel]);
  const onPolygonMouseenter = (e) => {
    setPopup(e.feature.properties);
  };

  return (
    <LarkMap mapType="GaodeV1" {...(config as LarkMapProps)} style={{ height: '700px' }}>
      <PolygonLayer
        source={{
          data: selectLabel ? { type: 'FeatureCollection', features: selectSource } : source,
          parser: { type: 'geojson' },
        }}
        {...polygonLayerOption}
        onCreated={(layer) => {
          layer?.on('mouseenter', onPolygonMouseenter);
        }}
      />
      {popup && (
        <Popup
          lngLat={{ lat: popup.latitude, lng: popup.longitude }}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom-left"
        >
          <div>名字:{popup.name}</div>
          <div>房子数量：{popup.count}</div>
          <div>房价：{popup.unit_price}</div>
        </Popup>
      )}
      <HousePrice setSelectLabel={setSelectLabel} />
    </LarkMap>
  );
};

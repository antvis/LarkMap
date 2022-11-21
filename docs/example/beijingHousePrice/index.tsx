import { LarkMap, LarkMapProps, PolygonLayer, Popup } from '@antv/larkmap';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import HousePrice from './legend';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'normal',
    center: [116.393722, 39.920746],
    zoom: 8,
  },
};

export default () => {
  const [source, setSource] = useState<any>([]);
  const [selectLabel, setSelectLabel] = useState<
    { value: string; label: string } | undefined
  >(undefined);
  const [popup, setPopup] = useState<Record<string, any> | undefined>();
  const [selectSource, setSelectSource] = useState([]);

  document.onkeydown = function (event) {
    if (event.code === 'Escape') {
      setSelectLabel(undefined);
    }
  };

  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/bc5f49d2-cdde-4a56-a233-b1c227dd0b09.json',
    )
      .then((res) => res.json())
      .then((data) => setSource(data))
      .then(() => {
        message.info('点击图例可更换数据');
      });
  }, []);

  const polygonLayerOption = {
    color: selectLabel
      ? selectLabel.value
      : {
          field: 'count',
          scale: { type: 'quantile' },
          value: [
            'rgba(239, 243, 255, .8)',
            'rgba(198, 219, 239, .8)',
            'rgba(158, 202, 225, .8)',
            'rgba(107, 174, 214, .8)',
            'rgba(49, 130, 189, .8)',
            'rgba(8, 81, 156, .8)',
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
    <LarkMap {...(config as LarkMapProps)} style={{ height: '60vh' }}>
      <PolygonLayer
        source={{
          data: selectLabel
            ? { type: 'FeatureCollection', features: selectSource }
            : source,
          parser: { type: 'geojson' },
        }}
        {...polygonLayerOption}
        onMouseEnter={(layer) => {
          onPolygonMouseenter(layer);
        }}
      />
      {popup && (
        <Popup
          lngLat={{ lat: popup.latitude, lng: popup.longitude }}
          closeButton={false}
          closeOnClick={false}
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

import type { LarkMapProps, LayerPopupProps, PolygonLayerProps } from '@antv/larkmap';
import { LarkMap, LayerPopup, PolygonLayer } from '@antv/larkmap';
import type { FeatureCollection } from '@turf/turf';
import { featureCollection } from '@turf/turf';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import HousePrice from './legend';

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'dark',
    center: [116.393722, 39.920746],
    zoom: 8,
  },
};

const layerPopupItems: LayerPopupProps['items'] = [
  {
    layer: 'myPolygonLayer',
    fields: ['name', 'count', 'unit_price'],
  },
];

export default () => {
  const [source, setSource] = useState<FeatureCollection>(featureCollection([]));
  const [selectLabel, setSelectLabel] = useState<{ value: [number, number]; label: string; color: string } | undefined>(
    undefined,
  );
  const [selectFeatures, setSelectFeatures] = useState([]);

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/bc5f49d2-cdde-4a56-a233-b1c227dd0b09.json')
      .then((res) => res.json())
      .then((data) => {
        setSource(data);
        message.info('点击图例可更换数据');
      });

    document.onkeydown = function (event) {
      if (event.code === 'Escape') {
        setSelectLabel(undefined);
      }
    };
  }, []);

  const polygonLayerOption: Omit<PolygonLayerProps, 'source'> = {
    id: 'myPolygonLayer',
    color: selectLabel
      ? selectLabel.color
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
      const newSelectFeatures = source.features.filter((item) => {
        const [min, max] = selectLabel.value;
        return +min < item.properties.count && item.properties.count < +max;
      });
      setSelectFeatures(newSelectFeatures);
    }
  }, [selectLabel, source]);

  return (
    <LarkMap {...(config as LarkMapProps)} style={{ height: '60vh' }}>
      <PolygonLayer
        source={{
          data: selectLabel ? { type: 'FeatureCollection', features: selectFeatures } : source,
          parser: { type: 'geojson' },
        }}
        {...polygonLayerOption}
      />
      <LayerPopup items={layerPopupItems} trigger="hover" />
      <HousePrice setSelectLabel={setSelectLabel} />
    </LarkMap>
  );
};

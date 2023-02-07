import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer } from '@antv/larkmap';
import * as turf from '@turf/turf';
import { message, Select } from 'antd';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import React, { useEffect, useState } from 'react';
import './index.less';

const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 0.1,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

export const RegionDownload: React.FC<any> = () => {
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const [adcode, setAdcode] = useState({
    code: 100000,
    level: 'country',
  });
  const [sourceValue, setSourceValue] = useState('dataV');
  const [thirdPartySource, setThirdPartySource] = useState({
    country: { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } },
    province: { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } },
    city: { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } },
    district: { data: { type: 'FeatureCollection', features: [] }, parser: { type: 'geojson' } },
  });
  useEffect(() => {
    if (sourceValue === 'dataV') {
      fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
        .then((response) => response.json())
        .then((data: any) => {
          setSource((prevState) => ({ ...prevState, data }));
        });
    } else {
      fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_guojie.pbf')
        .then((response) => response.arrayBuffer())
        .then((data: any) => {
          const geojson = geobuf.decode(new Pbf(data));
          const options = { tolerance: 0.001, highQuality: false };
          var simplified = turf.simplify(geojson, options);
          setSource((prevState) => ({
            ...prevState,
            data: { features: simplified.features, type: simplified.type },
          }));
          console.log(simplified);
          setThirdPartySource((prevState) => {
            console.log(
              simplified.features,
              {
                country: { ...prevState.country, data: { features: simplified.features, type: simplified.type } },
              },
              '1111111',
            );
            return {
              ...prevState,
              country: { ...prevState.country, data: { features: simplified.features, type: simplified.type } },
            };
          });
        });
      fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_sheng.pbf')
        .then((response) => response.arrayBuffer())
        .then((data: any) => {
          const geojson = geobuf.decode(new Pbf(data));
          const options = { tolerance: 0.001, highQuality: false };
          var simplified = turf.simplify(geojson, options);
          setThirdPartySource((prevState) => ({
            ...prevState,
            province: { ...prevState.province, data: { features: simplified.features, type: simplified.type } },
          }));
        });
      fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_shi.pbf')
        .then((response) => response.arrayBuffer())
        .then((data: any) => {
          const geojson = geobuf.decode(new Pbf(data));
          const options = { tolerance: 0.001, highQuality: false };
          var simplified = turf.simplify(geojson, options);
          setThirdPartySource((prevState) => ({
            ...prevState,
            city: { ...prevState.city, data: { features: simplified.features, type: simplified.type } },
          }));
        });
      fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_xian.pbf')
        .then((response) => response.arrayBuffer())
        .then((data: any) => {
          const geojson = geobuf.decode(new Pbf(data));
          const options = { tolerance: 0.001, highQuality: false };
          var simplified = turf.simplify(geojson, options);
          setThirdPartySource((prevState) => ({
            ...prevState,
            district: { ...prevState.district, data: { features: simplified.features, type: simplified.type } },
          }));
        });
    }
  }, [sourceValue]);

  const onDblClick = (e: any) => {
    const level = e.feature.properties.level;
    if (e.feature.properties.childrenNum && e.feature.properties.level !== 'district') {
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${e.feature.properties.adcode}_full.json`)
        .then((response) => response.json())
        .then((data: any) => {
          setSource((prevState) => ({ ...prevState, data }));
        });
    } else if (e.feature.properties.level === 'district') {
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${e.feature.properties.adcode}.json`)
        .then((response) => response.json())
        .then((data: any) => {
          setSource((prevState) => ({ ...prevState, data }));
        });
    }
    if (e.feature.properties.parent.adcode) {
      setAdcode({ code: e.feature.properties.parent.adcode, level });
    } else {
      const code = JSON.parse(e.feature.properties.parent).adcode;
      setAdcode({ code, level });
    }
  };

  const onUndblclick = () => {
    if (adcode.level === 'country') {
      message.info('已经上钻到最上层级');
    } else {
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode.code}_full.json`)
        .then((response) => response.json())
        .then((data: any) => {
          setSource((prevState) => ({ ...prevState, data }));
        });
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode.code}.json`)
        .then((response) => response.json())
        .then((data: any) => {
          const dataCode = data.features[0].properties.parent.adcode;
          const dataLevel = data.features[0].properties.level;
          console.log(dataCode, dataLevel, 'dataCode');
          if (typeof dataCode !== 'undefined') {
            setAdcode({ code: dataCode, level: dataLevel });
          } else {
            if (dataCode === null) {
              setAdcode({ code: 100000, level: dataLevel });
            } else {
              const code = JSON.parse(data.features[0].properties.parent).adcode;
              console.log(code);
              setAdcode({ code, level: dataLevel });
            }
          }
          console.log(adcode, 'adcode');
        });
    }
  };

  const handleChange = (e) => {
    setSourceValue(e);
  };
  return (
    <>
      <ChoroplethLayer {...layerOptions} source={source} onDblClick={onDblClick} onUndblclick={onUndblclick} />
      <div className="panel">
        <div>数据源：</div>
        <Select
          value={sourceValue}
          style={{ width: 220 }}
          onChange={handleChange}
          options={[
            { value: 'dataV', label: 'dataV数据源' },
            { value: 'thirdParty', label: '第三方数据源' },
          ]}
        />
      </div>
    </>
  );
};

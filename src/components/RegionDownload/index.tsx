import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer } from '@antv/larkmap';
import { message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { DataSource } from './unit';

const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: {
    field: 'adcode',
    value: ['#0f9960', '#33a02c', '#377eb8'],
  },
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 1,
  state: {
    active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
    select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

export const RegionDownload: React.FC = () => {
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const [adcode, setAdcode] = useState({
    code: 100000,
    level: 'country',
    GID_1: undefined,
    GID_2: undefined,
  });
  const [a, seta] = useState<DataSource>();
  const [sourceValue, setSourceValue] = useState('dataV');

  useEffect(() => {
    const obj = new DataSource();
    seta(obj);
  }, []);

  useEffect(() => {
    if (sourceValue === 'dataV') {
      fetch(`https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`)
        .then((response) => response.json())
        .then((data: any) => {
          setSource((prevState) => ({ ...prevState, data: data }));
        });
    } else {
      setSource((prevState) => ({ ...prevState, data: { type: a.country.type, features: a.country.features } }));
    }
  }, [sourceValue]);

  const onDblClick = async (e: any) => {
    if (sourceValue === 'dataV') {
      const code = e.feature.properties.adcode;
      const areaLevel = e.feature.properties.level;
      const data = await a.getDrillingData(sourceValue, code, areaLevel);
      setSource((prevState) => ({ ...prevState, data: data }));
      if (e.feature.properties.parent.adcode) {
        setAdcode((state) => ({ ...state, code: e.feature.properties.parent.adcode, level: areaLevel }));
      } else {
        const codeJson = JSON.parse(e.feature.properties.parent).adcode;
        setAdcode((state) => ({ ...state, code: codeJson, level: areaLevel }));
      }
    } else {
      const L7code = e.feature.properties.FIRST_GID
        ? e.feature.properties.FIRST_GID
        : e.feature.properties.code
        ? e.feature.properties.code
        : 100000;
      const data = await a.getDrillingData(sourceValue, L7code, adcode.level);
      setSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode((state) => ({
        ...state,
        code: L7code,
        level: data.areaLevel,
        GID_1: e.feature.properties.GID_1,
        GID_2: e.feature.properties.GID_2,
      }));
    }
  };

  useEffect(() => {
    console.log(adcode);
  }, [adcode]);

  const onUndblclick = async () => {
    if (adcode.level === 'country') {
      message.info('已经上钻到最上层级');
    } else {
      const data = await a.gitRollupData(sourceValue, adcode.code, adcode.level, adcode.GID_1, adcode.GID_2);
      setSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode({ code: data.code, level: data.areaLevel, GID_1: data?.GID_1, GID_2: data?.GID_2 });
    }
  };

  const handleChange = (e) => {
    setSourceValue(e);
    setAdcode((state) => ({ ...state, code: 100000, level: 'country' }));
    console.log(a.country);
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

import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomControl, MapThemeControl } from '../Control';
import { LayerPopup } from '../LayerPopup';
import type { LayerPopupProps } from '../LayerPopup/types';
import type { ChoroplethLayerProps } from '../Layers';
import { ChoroplethLayer } from '../Layers';
import { DataSource } from './data/DataSource';
import './index.less';
import { getDrillingData, gitRollupData } from './utli';

const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
  autoFit: true,
  fillColor: '#377eb8',
  opacity: 0.3,
  strokeColor: 'blue',
  lineWidth: 0.5,
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
  const [dataLead, setdataLead] = useState<DataSource>();
  const [sourceValue, setSourceValue] = useState('thirdParty');

  useEffect(() => {
    const obj = new DataSource();
    setdataLead(obj);
  }, []);

  // @ts-ignore
  useEffect(async () => {
    if (sourceValue === 'dataV') {
      setSource((prevState) => ({
        ...prevState,
        data: dataLead.DataVSource,
      }));
    } else {
      if (dataLead) {
        await dataLead.gitCountryData().then((res) => {
          setSource((prevState) => ({
            ...prevState,
            data: { type: res?.type, features: res?.features },
          }));
        });
      }
    }
  }, [sourceValue, dataLead]);

  const onDblClick = async (e: any) => {
    if (sourceValue === 'dataV') {
      const code = e.feature.properties.adcode;
      const areaLevel = e.feature.properties.level;
      const data = await getDrillingData(dataLead, sourceValue, code, areaLevel);
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
      const data = await getDrillingData(dataLead, sourceValue, L7code, adcode.level);
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

  const onUndblclick = async () => {
    if (adcode.level === 'country') {
      message.info('已经上钻到最上层级');
    } else {
      const data = await gitRollupData(dataLead, sourceValue, adcode.code, adcode.level, adcode.GID_1, adcode.GID_2);
      setSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode({ code: data.code, level: data.areaLevel, GID_1: data?.GID_1, GID_2: data?.GID_2 });
    }
  };

  const layerClick = (e) => {
    console.log(e);
  };

  const handleChange = (e) => {
    setAdcode((state) => ({ ...state, code: 100000, level: 'country' }));
    setSourceValue(e);
  };

  const copy = (data: any) => {
    const oInput = document.createElement('input');
    oInput.value = data;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.style.display = 'none';
    message.success('复制成功');
  };

  useEffect(() => {
    console.log(source.data);
  }, [source.data]);
  const items: LayerPopupProps['items'] = useMemo(() => {
    if (sourceValue === 'dataV') {
      return [
        {
          layer: 'myChoroplethLayer',
          fields: [
            {
              field: 'name',
              formatField: () => '名称',
            },
            {
              field: 'adcode',
              formatField: '行政编号',
            },
          ],
        },
      ];
    } else {
      if (adcode.level === 'country') {
        return [
          {
            layer: 'myChoroplethLayer',
            fields: [
              {
                field: 'ENG_NAME',
              },

              {
                field: 'code',
                formatValue: '100000',
              },
            ],
          },
        ];
      } else if (adcode.level === 'province') {
        return [
          {
            layer: 'myChoroplethLayer',
            fields: [
              {
                field: 'ENG_NAME',
              },

              {
                field: 'FIRST_GID',
                formatField: 'code',
              },
            ],
          },
        ];
      } else {
        return [
          {
            layer: 'myChoroplethLayer',
            fields: [
              {
                field: 'ENG_NAME',
              },
              {
                field: 'code',
              },
            ],
          },
        ];
      }
    }
  }, [sourceValue, adcode.level]);

  return (
    <>
      <ChoroplethLayer
        {...layerOptions}
        source={source}
        onDblClick={onDblClick}
        onUndblclick={onUndblclick}
        onClick={layerClick}
        id="myChoroplethLayer"
      />
      <LayerPopup closeButton={false} closeOnClick={false} anchor="bottom-left" trigger="hover" items={items} />
      <MapThemeControl position="topleft" />
      <CustomControl
        position="bottomleft"
        className="custom-control-class"
        style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', padding: 16 }}
      >
        <div>单击选择区域数据</div>
        <div>下钻: 双击要下钻的区域</div>
        <div>下卷: 双击要上卷的区域</div>
      </CustomControl>
      <div className="panel">
        <div className="source-select">
          <div>数据源：</div>
          <Select
            value={sourceValue}
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: 'dataV', label: 'dataV数据源' },
              { value: 'thirdParty', label: '第三方数据源' },
            ]}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <div>数据来源：</div>
          {sourceValue === 'dataV' ? (
            <a href="https://datav.aliyun.com/portal/school/atlas/area_selector">dataV.GeoAtlas官网</a>
          ) : (
            <div>
              <a href="https://github.com/ruiduobao/shengshixian.com">GitHub</a>
            </div>
          )}
        </div>

        <div className="download-content">
          <div>数据下载</div>
          <div className="data-input">
            <Button onClick={() => copy(source.data)}>
              <CopyOutlined />
            </Button>
            <a
              download="区域数据.json"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(source.data))}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button>
                <DownloadOutlined />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

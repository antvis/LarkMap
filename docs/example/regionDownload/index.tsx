import { CopyOutlined, DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ChoroplethLayerProps, LarkMapProps, LayerPopupProps } from '@antv/larkmap';
import { ChoroplethLayer, CustomControl, LarkMap, LayerPopup, MapThemeControl } from '@antv/larkmap';
import { Button, Checkbox, message, Popover, Select, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { DataSource } from './data/dataSource';
import './index.less';
import { adda, downloadData, getDrillingData, gitFilterData, gitRollupData } from './util';

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

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 9,
  },
};

export default () => {
  const [source, setSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const [adcode, setAdcode] = useState({
    code: 100000,
    adcode: 10000,
    level: 'country',
    GID_1: undefined,
    GID_2: undefined,
  });
  const [dataLead, setdataLead] = useState<DataSource>();
  const [sourceValue, setSourceValue] = useState('thirdParty');
  const [loading, setLoading] = useState(false);
  const [accuracyValue, setAccuracyVAlue] = useState(0.005);
  const [cityData, setCityData] = useState({
    code: 100000,
    name: `'the People's Republic of China'`,
    data: undefined,
  });
  const [clickData, setClickData] = useState(undefined);
  const [CheckValue, setCheckboxValue] = useState([]);

  useEffect(() => {
    const obj = new DataSource();
    setdataLead(obj);
  }, []);

  // @ts-ignore
  useEffect(async () => {
    setLoading(true);
    if (sourceValue === 'dataV') {
      setSource((prevState) => ({
        ...prevState,
        data: dataLead.DataVSource,
      }));
      setCityData({
        code: 100000,
        name: `中华人民共和国`,
        data: dataLead.DataVSource,
      });
    } else {
      if (dataLead) {
        await dataLead.gitCountryData().then((res) => {
          setSource((prevState) => ({
            ...prevState,
            data: { type: res?.type, features: res?.features },
          }));
          setCityData({
            code: 100000,
            name: `'the People's Republic of China'`,
            data: dataLead.country,
          });
        });
      }
    }
    setLoading(false);
  }, [sourceValue, dataLead]);

  const onDblClick = async (e: any) => {
    setLoading(true);
    if (sourceValue === 'dataV') {
      const code = e.feature.properties.adcode;
      const areaLevel = e.feature.properties.level;
      const data = await getDrillingData(dataLead, sourceValue, code, areaLevel);
      setCityData({
        code: code,
        name: e.feature.properties.name,
        data: e.feature,
      });
      setSource((prevState) => ({ ...prevState, data: data }));
      if (e.feature.properties.parent.adcode) {
        setAdcode((state) => ({ ...state, code: e.feature.properties.parent.adcode, level: areaLevel, adcode: code }));
      } else {
        const codeJson = JSON.parse(e.feature.properties.parent).adcode;
        setAdcode((state) => ({ ...state, code: codeJson, level: areaLevel, adcode: code }));
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
        adcode: L7code,
        level: data.areaLevel,
        GID_1: e.feature.properties.GID_1,
        GID_2: e.feature.properties.GID_2,
      }));
      setCityData({
        code: L7code,
        name: e.feature.properties.ENG_NAME,
        data: e.feature,
      });
    }
    setClickData(undefined);
    setCheckboxValue([]);
    setLoading(false);
  };

  const onUndblclick = async () => {
    setLoading(true);
    if (adcode.level === 'country') {
      message.info('已经上钻到最上层级');
      if (sourceValue === 'dataV') {
        setCityData({
          code: 100000,
          name: `中华人民共和国`,
          data: dataLead.DataVSource,
        });
      } else {
        setCityData({
          code: 100000,
          name: `'the People's Republic of China'`,
          data: dataLead.country,
        });
      }
    } else {
      const data = await gitRollupData(dataLead, sourceValue, adcode.code, adcode.level, adcode.GID_1, adcode.GID_2);
      const filterdata = await gitFilterData(
        dataLead,
        sourceValue,
        adcode.code,
        adcode.level,
        adcode.GID_1,
        adcode.GID_2,
      );
      if (sourceValue === 'dataV') {
        setCityData({
          code: filterdata.code,
          name: filterdata.geoJson.features[0].properties.name,
          data: filterdata.geoJson,
        });
      } else {
        if (adcode.level === 'city') {
          setCityData({
            code: 100000,
            name: `'the People's Republic of China'`,
            data: dataLead.country,
          });
        } else {
          setCityData({
            code: data.code,
            name: filterdata.geoJson.features[0].properties.ENG_NAME,
            data: filterdata.geoJson,
          });
        }
      }

      setSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode({ code: data.code, level: data.areaLevel, GID_1: data?.GID_1, GID_2: data?.GID_2, adcode: data.code });
    }
    setClickData(undefined);
    setCheckboxValue([]);
    setLoading(false);
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

  const onDownload = async () => {
    message.info('数据下载中');
    const data = await downloadData(
      dataLead,
      sourceValue,
      adcode.code,
      accuracyValue,
      adcode.level,
      adcode.GID_1,
      adcode.GID_2,
    );
    const download = document.createElement('a');
    download.download = `${adcode.adcode}.json`;
    download.href = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(sourceValue === 'dataV' ? source.data : data),
    )}`;
    download.target = '_blank';
    download.rel = 'noreferrer';
    download.click();
    message.success('数据下载完成');
  };

  const onAccuracyChange = (e) => {
    setAccuracyVAlue(e);
  };

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

  const onLayerClick = (e) => {
    if (sourceValue === 'thirdParty') {
      const L7code = e.feature.properties.FIRST_GID
        ? e.feature.properties.FIRST_GID
        : e.feature.properties.code
        ? e.feature.properties.code
        : 100000;
      setClickData({
        geojson: e.feature,
        name: e.feature.properties.ENG_NAME,
        code: L7code,
      });
    } else {
      setClickData({
        geojson: e.feature,
        name: e.feature.properties.name,
        code: e.feature.properties.code,
      });
    }
  };

  const content = (
    <div>
      <p>点击下载当前层级对应上级数据</p>
    </div>
  );

  const granularity = useMemo(() => {
    if (adcode.level === 'country') {
      return [
        { label: '省', value: 'province' },
        { label: '市', value: 'city' },
        { label: '县', value: 'district' },
      ];
    }
    if (adcode.level === 'province') {
      return [
        { label: '市', value: 'city' },
        { label: '县', value: 'district' },
      ];
    }
    if (adcode.level === 'city') {
      return [{ label: '县', value: 'district' }];
    }
    return [];
  }, [adcode.level]);

  const onCheckChange = (e) => {
    setCheckboxValue(e);
  };

  const clickDownload = () => {
    if (sourceValue === 'thirdParty') {
      if (adcode.level === 'country') {
        CheckValue.forEach(async (item: string) => {
          if (item === 'province') {
            const provinceData = await dataLead.gitData(0.05, 'province');
            adda(provinceData, 'province');
          }
          if (item === 'city') {
            const cityDatas = await dataLead.gitData(0.05, 'city');
            adda(cityDatas, 'city');
          }
          if (item === 'district') {
            const districtData = await dataLead.gitData(0.05, 'district');
            adda(districtData, 'district');
          }
        });
      }
      if (adcode.level === 'province') {
        CheckValue.forEach(async (item: string) => {
          if (item === 'city') {
            const Data = await dataLead.gitData(0.05, 'city');
            const filterdata = Data.features.filter((v) => {
              return v.properties.GID_1 === adcode.code;
            });
            adda(filterdata, 'city');
          }
          if (item === 'district') {
            const Data = await dataLead.gitData(0.05, 'district');
            const filterdata = Data.features.filter((v) => {
              return v.properties.GID_1 === adcode.code;
            });
            adda(filterdata, 'district');
          }
        });
      }
      if (adcode.level === 'city') {
        CheckValue.forEach(async (item: string) => {
          if (item === 'district') {
            const Data = await dataLead.gitData(0.05, 'district');
            const filterdata = Data.features.filter((v) => {
              return v.properties.GID_2 === adcode.code;
            });
            adda(filterdata, 'district');
          }
        });
      }
      adda(clickData.geojson, adcode.level);
    } else {
      adda(clickData.geojson, clickData.name);
    }
  };

  return (
    <Spin spinning={loading}>
      <LarkMap {...config} style={{ height: '300px' }}>
        <ChoroplethLayer
          {...layerOptions}
          source={source}
          onDblClick={onDblClick}
          onUndblclick={onUndblclick}
          onClick={onLayerClick}
          id="myChoroplethLayer"
        />
        <LayerPopup closeButton={false} closeOnClick={false} anchor="bottom-left" trigger="hover" items={items} />
        <MapThemeControl position="topleft" />
        <CustomControl
          position="bottomleft"
          className="custom-control-class"
          style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', padding: 16 }}
        >
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
          {cityData.code ? (
            <div style={{ marginTop: 10 }}>
              <div>当前选择</div>
              <div>地名：{cityData.name}</div>
              <div>
                城市编码：
                <a
                  download={`${cityData.name}.json`}
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cityData.data))}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cityData.code}
                </a>
                <Popover content={content}>
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </div>
          ) : null}
          {sourceValue === 'thirdParty' && (
            <>
              <div>高级设置</div>
              <div className="download-content">
                <div>数据精度：</div>
                <Select
                  style={{ width: 120 }}
                  value={accuracyValue}
                  onChange={onAccuracyChange}
                  options={[
                    { value: 0.001, label: '高' },
                    { value: 0.005, label: '中' },
                    { value: 0.01, label: '低' },
                  ]}
                />
              </div>
            </>
          )}
          {clickData && (
            <div>
              <div>选中数据下载</div>
              {sourceValue === 'thirdParty' && (
                <div style={{ display: 'flex' }}>
                  <div>数据粒度选择：</div>
                  <Checkbox.Group options={granularity} onChange={onCheckChange} />
                </div>
              )}
              <div style={{ display: 'flex' }}>
                <div>选中名称：</div>
                <div>{clickData.name}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div>选中城市编码：</div>
                <Popover content={'点击下载选中数据'}>
                  <a onClick={clickDownload}>{clickData.code}</a>
                </Popover>
              </div>
            </div>
          )}

          <div className="download-content">
            <div style={{ marginRight: 10 }}>数据下载</div>

            <div className="data-input">
              <Popover content={'复制'}>
                <Button onClick={() => copy(source.data)}>
                  <CopyOutlined />
                </Button>
              </Popover>
              <Popover content={'下载当前层级全部数据'}>
                <Button onClick={onDownload}>
                  <DownloadOutlined />
                </Button>
              </Popover>
            </div>
          </div>
          <div style={{ marginTop: 10, display: 'flex' }}>
            <div>数据来源：</div>
            {sourceValue === 'dataV' ? (
              <a href="https://datav.aliyun.com/portal/school/atlas/area_selector">dataV.GeoAtlas官网</a>
            ) : (
              <div>
                <a href="https://github.com/ruiduobao/shengshixian.com">GitHub</a>
              </div>
            )}
          </div>
        </div>
      </LarkMap>
    </Spin>
  );
};

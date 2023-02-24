import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import type { LayerPopupProps } from '@antv/larkmap';
import { ChoroplethLayer, CustomControl, LarkMap, LayerPopup, MapThemeControl } from '@antv/larkmap';
import { Button, Checkbox, Collapse, message, Popover, Select, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { BaseSource, SourceType } from './data';
import { DataSourceMap } from './data';
import type { DataLevel, DataPrecision } from './data/BaseDataSource';
import './index.less';
import {
  accuracyOption,
  bulkDownload,
  cityValue,
  config,
  copy,
  downloadData,
  editionOptions,
  getDrillingData,
  gitRollupData,
  item,
  layerOptions,
  RollupType,
  sourceOptions,
} from './util';

const { Panel } = Collapse;

export default () => {
  const [layerSource, setLayerSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const [sourceType, setSourceType] = useState<SourceType>('L7Source');
  const [sourceEdition, setSourceEdition] = useState('2023');
  const [adcode, setAdcode] = useState({
    code: 100000,
    adcode: 100000,
    level: 'country',
  });

  const [dataSource, setDataSource] = useState<BaseSource>();
  const [accuracyValue, setAccuracyVAlue] = useState<DataPrecision>('low');
  const [panelData, setPanelData] = useState({
    clickData: undefined,
    CheckValue: [],
    loading: false,
  });

  useEffect(() => {
    setSourceEdition(editionOptions[sourceType][0].value);
  }, [sourceType]);

  // 切换数据源
  useEffect(() => {
    // setSourceEdition(editionOptions[sourceType][0].value);
    const currentSource = new DataSourceMap[sourceType]({ version: sourceEdition });
    setPanelData((v) => ({ ...v, loading: true }));
    setDataSource(currentSource);
    // 初始化数据
    currentSource.getData({ level: 'country', code: 100000, full: true }).then((data) => {
      setLayerSource((prevState) => ({
        ...prevState,
        data,
      }));
      setPanelData((v) => ({ ...v, loading: false, clickData: undefined }));
    });
  }, [sourceType, sourceEdition]);

  // 下钻
  const onDblClick = async (e: any) => {
    setPanelData((v) => ({ ...v, loading: true }));
    if (adcode.level !== 'district') {
      const data = {
        DataVSource: {
          parentCode: e.feature.properties?.parent?.adcode
            ? e.feature.properties?.parent?.adcode
            : e.feature.properties?.parent
            ? JSON.parse(e.feature.properties?.parent)?.adcode
            : undefined,
          full: adcode.level !== 'city' ? true : false,
        },
        L7Source: {
          parentCode: e.feature.properties[`${RollupType[adcode.level]}_adcode`],
          full: undefined,
        },
      };
      const code = e.feature.properties.adcode;
      const datas = await getDrillingData(dataSource, code, data[sourceType].full, adcode.level);

      const dataLevel = {
        DataVSource: e.feature.properties.level,
        L7Source: datas.level,
      };
      setLayerSource((prevState) => ({ ...prevState, data: datas.GeoJSON }));
      setAdcode((state) => ({
        ...state,
        code: data[sourceType].parentCode,
        adcode: code,
        level: dataLevel[sourceType],
      }));
    } else {
      message.info('已下钻到最后一层');
    }
    setPanelData((v) => ({ ...v, clickData: undefined, CheckValue: [], loading: false }));
  };

  const onUndblclick = async () => {
    setPanelData({ ...panelData, loading: true });
    if (adcode.level === 'country') {
      message.info('已经上钻到最上层级');
    } else {
      const type = {
        DataVSource: true,
        L7Source: false,
      };
      const data = await gitRollupData({
        source: dataSource,
        code: adcode.code,
        type: type[sourceType],
        areaLevel: adcode.level,
      });

      setLayerSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode({ code: data.code, level: data.areaLevel, adcode: data.code });
    }
    setPanelData((v) => ({ ...v, clickData: undefined, CheckValue: [], loading: false }));
  };

  const onDownload = async () => {
    message.info('数据下载中');
    const data = await downloadData(dataSource, adcode.code, accuracyValue, adcode.level);
    const download = document.createElement('a');
    download.download = `${adcode.adcode}.json`;
    download.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    download.target = '_blank';
    download.rel = 'noreferrer';
    download.click();
    message.success('数据下载完成');
  };

  const onAccuracyChange = (e) => {
    setAccuracyVAlue(e);
  };

  const items: LayerPopupProps['items'] = useMemo(() => {
    return item();
  }, [sourceType, adcode.level]);

  const onLayerClick = (e) => {
    setPanelData((v) => ({
      ...v,
      clickData: {
        geojson: e.feature,
        name: e.feature.properties.name,
        code: e.feature.properties.adcode,
      },
    }));
  };

  const granularity = useMemo(() => {
    return cityValue(adcode.level);
  }, [adcode.level]);

  const onCheckChange = (e) => {
    setPanelData((v) => ({ ...v, CheckValue: e }));
  };

  const onSourceEdition = (e) => {
    setSourceEdition(e);
  };

  const clickDownload = () => {
    panelData.CheckValue.forEach(async (level: any) => {
      const data = await dataSource.getChildrenData({
        parentName: panelData.clickData.code,
        parentLevel: adcode.level as DataLevel,
        childrenLevel: level,
        shineUpon: {
          country: '',
          province: 'province_adcode',
          city: 'city_adcode',
        },
      });
      bulkDownload(data, level);
    });
    bulkDownload(panelData.clickData.geojson, panelData.clickData.name);
  };

  return (
    <Spin spinning={panelData.loading}>
      <div style={{ display: 'flex' }}>
        <LarkMap {...config} style={{ height: '90vh', width: 'calc(100% - 300px)' }}>
          <ChoroplethLayer
            {...layerOptions}
            source={layerSource}
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
        </LarkMap>
        <div className="panel">
          <div className="source-select">
            <div className="source-flex">
              <div>数据源：</div>
              <Select value={sourceType} style={{ width: 140 }} onChange={setSourceType} options={sourceOptions} />
            </div>
            <div className="source-flex">
              <div>版本号：</div>
              <Select
                value={sourceEdition}
                style={{ width: 140 }}
                onChange={onSourceEdition}
                options={editionOptions[sourceType]}
              />
            </div>
            <div className="infoText">选择切换不同的数据源和版本号</div>
          </div>

          <Collapse defaultActiveKey={['1']} ghost style={{ paddingTop: '12px' }}>
            <Panel header="下载选中数据" key="1">
              {sourceType === 'L7Source' && (
                <div style={{ display: 'flex', marginBottom: 10 }}>
                  <div>数据粒度选择：</div>
                  <Checkbox.Group options={granularity} onChange={onCheckChange} />
                </div>
              )}
              {panelData.clickData ? (
                <>
                  <div style={{ display: 'flex', marginBottom: 10 }}>
                    <div>选中名称：</div>
                    <div>{panelData.clickData.name}</div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div>选中城市编码：</div>
                    <Popover content={'点击下载选中数据'}>
                      <a onClick={clickDownload}>{panelData.clickData.code}</a>
                    </Popover>
                  </div>
                </>
              ) : (
                <div className="infoText">暂无数据，请单击图层选择数据</div>
              )}
            </Panel>
          </Collapse>

          {sourceType === 'L7Source' && (
            <Collapse defaultActiveKey={['1']} ghost style={{ paddingTop: '10px' }}>
              <Panel header="高级设置" key="1">
                <div className="flexCenter">
                  <div>数据精度：</div>
                  <Select
                    style={{ width: 120 }}
                    value={accuracyValue}
                    onChange={onAccuracyChange}
                    options={accuracyOption}
                  />
                </div>
              </Panel>
            </Collapse>
          )}
          <div className="download-content">
            <div style={{ marginRight: 10 }}>数据下载</div>
            <div className="data-input">
              <Popover content={'复制'}>
                <Button onClick={() => copy(JSON.stringify(layerSource.data))}>
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
          <div className="originData" style={{}}>
            <div>数据来源：</div>
            <a href={`${dataSource?.info.desc.href}`}>{`${dataSource?.info.desc.text}`}</a>
          </div>
        </div>
      </div>
    </Spin>
  );
};

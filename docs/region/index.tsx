import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ChoroplethLayerProps, LarkMapProps, LayerPopupProps } from '@antv/larkmap';
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
  copy,
  downloadData,
  getDrillingData,
  gitRollupData,
  item,
  sourceOptions,
} from './util';

const { Panel } = Collapse;

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
    zoom: 3,
  },
};

export default () => {
  const [layerSource, setLayerSource] = useState({
    data: { type: 'FeatureCollection', features: [] },
    parser: { type: 'geojson' },
  });
  const [sourceType, setSourceType] = useState<SourceType>('L7Source');
  const [adcode, setAdcode] = useState({
    code: 100000,
    adcode: 100000,
    level: 'country',
    GID_1: undefined,
    GID_2: undefined,
  });

  const [dataSource, setDataSource] = useState<BaseSource>();
  const [loading, setLoading] = useState(false);
  const [accuracyValue, setAccuracyVAlue] = useState<DataPrecision>('low');
  const [clickData, setClickData] = useState(undefined);
  const [CheckValue, setCheckboxValue] = useState([]);

  // 切换数据源
  useEffect(() => {
    const currentSource = new DataSourceMap[sourceType]({});
    setLoading(true);
    setDataSource(currentSource);
    // 初始化数据
    currentSource.getData({ level: 'country', code: 100000, full: true }).then((data) => {
      setLayerSource((prevState) => ({
        ...prevState,
        data,
      }));
      setLoading(false);
    });
  }, [sourceType]);

  // 下钻
  const onDblClick = async (e: any) => {
    setLoading(true);
    console.log(e);
    if (adcode.level !== 'district') {
      const L7Code = e.feature.properties?.FIRST_GID
        ? e.feature.properties?.FIRST_GID
        : e.feature.properties?.code
        ? e.feature.properties?.code
        : 100000;
      const dataVCode = e.feature.properties?.adcode;
      const data = {
        DataVSource: {
          code: dataVCode,
          parentCode: e.feature.properties?.parent?.adcode
            ? e.feature.properties?.parent?.adcode
            : e.feature.properties?.parent
            ? JSON.parse(e.feature.properties?.parent)?.adcode
            : undefined,
          full: adcode.level !== 'city' ? true : false,
        },
        L7Source: {
          code: L7Code,
          parentCode: L7Code,
          full: undefined,
        },
      };
      const datas = await getDrillingData(dataSource, data[sourceType].code, data[sourceType].full, adcode.level);

      const dataLevel = {
        DataVSource: e.feature.properties.level,
        L7Source: datas.level,
      };
      setLayerSource((prevState) => ({ ...prevState, data: datas.GeoJSON }));
      setAdcode((state) => ({
        ...state,
        code: data[sourceType].parentCode,
        adcode: data[sourceType].code,
        level: dataLevel[sourceType],
        GID_1: e.feature.properties.GID_1,
        GID_2: e.feature.properties.GID_2,
      }));
    } else {
      message.info('已下钻到最后一层');
    }
    setClickData(undefined);
    setCheckboxValue([]);
    setLoading(false);
  };

  const onUndblclick = async () => {
    setLoading(true);
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
        GID_1: adcode.GID_1,
      });

      setLayerSource((prevState) => ({ ...prevState, data: data.geoJson }));
      setAdcode({ code: data.code, level: data.areaLevel, GID_1: data?.GID_1, GID_2: data?.GID_2, adcode: data.code });
    }
    setClickData(undefined);
    setCheckboxValue([]);
    setLoading(false);
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
    return item(sourceType, adcode.level);
  }, [sourceType, adcode.level]);

  const onLayerClick = (e) => {
    if (sourceType === 'L7Source') {
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
        code: e.feature.properties.adcode,
      });
    }
  };

  const granularity = useMemo(() => {
    return cityValue(adcode.level);
  }, [adcode.level]);

  const onCheckChange = (e) => {
    setCheckboxValue(e);
  };

  const clickDownload = () => {
    if (sourceType === 'L7Source') {
      CheckValue.forEach(async (level: any) => {
        const data = await dataSource.getChildrenData({
          parentName: clickData.code,
          parentLevel: adcode.level as DataLevel,
          childrenLevel: level,
          shineUpon: {
            country: '',
            province: 'GID_1',
            city: 'GID_2',
          },
        });
        bulkDownload(data, level);
      });
      bulkDownload(clickData.geojson, adcode.level);
    } else {
      bulkDownload(clickData.geojson, clickData.name);
    }
  };

  return (
    <Spin spinning={loading}>
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
            <div>数据源：</div>
            <Select value={sourceType} style={{ width: 150 }} onChange={setSourceType} options={sourceOptions} />
          </div>
          {clickData && (
            <Collapse defaultActiveKey={['1']} ghost style={{ paddingTop: '12px' }}>
              <Panel header="下载选中数据" key="1">
                {sourceType === 'L7Source' && (
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
              </Panel>
            </Collapse>
          )}
          {sourceType === 'L7Source' && (
            <Collapse defaultActiveKey={['1']} ghost style={{ paddingTop: '12px' }}>
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

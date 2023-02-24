import type { ChoroplethLayerProps, LarkMapProps } from '@antv/larkmap';
import { message } from 'antd';
import type { BaseSource } from './data';
import type { DataLevel, DataPrecision } from './data/BaseDataSource';

export const layerOptions: Omit<ChoroplethLayerProps, 'source'> = {
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

export const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 3,
  },
};

export const DrillingType = {
  country: 'province',
  province: 'city',
  city: 'district',
};

const DrillingCode = {
  province: '',
  city: '',
  district: 'code',
};

export const RollupType: Record<DataLevel, any> = {
  district: 'city',
  city: 'province',
  province: 'country',
  country: '',
  jiuduanxian: '',
};

export const getDrillingData = async (source: BaseSource, code?: number, full?: boolean, areaLevel?: DataLevel) => {
  const data = await source.getChildrenData({
    parentName: code,
    parentLevel: areaLevel,
    childrenLevel: DrillingType[areaLevel],
    shineUpon: { country: '', province: 'province_adcode', city: 'city_adcode', district: '', jiuduanxian: '' },
    full: full,
  });
  console.log(data);
  return {
    GeoJSON: data,
    level: DrillingType[areaLevel],
  };
};

export const gitRollupData = async (option: {
  source: BaseSource;
  code: number;
  type: boolean;
  areaLevel?: string;
}) => {
  const { source, code, type, areaLevel } = option;
  if (type) {
    const fullData = await source.getData({ code: code, full: true });
    const data = await source.getData({ code: code });
    const dataCode = data.features[0].properties.parent.adcode;
    const dataLevel = data.features[0].properties.level;
    if (typeof dataCode !== 'undefined') {
      return {
        geoJson: fullData,
        code: dataCode,
        areaLevel: dataLevel,
      };
    } else {
      if (dataCode === null) {
        return { geoJson: fullData, areaLevel: dataLevel, code: 100000 };
      } else {
        const codeJson = JSON.parse(data.features[0].properties.parent).adcode;
        return { geoJson: fullData, code: codeJson, areaLevel: dataLevel };
      }
    }
  }
  const data = await source.getChildrenData({
    parentName: code,
    parentLevel: RollupType[areaLevel],
    childrenLevel: RollupType[areaLevel],
    shineUpon: { country: '', province: '', city: 'province_adcode', district: 'city_adcode', jiuduanxian: '' },
  });
  return {
    geoJson: data,
    code: option[DrillingCode[areaLevel]] ? option[DrillingCode[areaLevel]] : 100000,
    areaLevel: RollupType[areaLevel],
  };
};

export const downloadData = async (
  source: BaseSource,
  code: number,
  accuracy: DataPrecision,
  areaLevel?: DataLevel,
) => {
  const data = await source.getChildrenData({
    parentName: code,
    parentLevel: areaLevel,
    childrenLevel: areaLevel,
    shineUpon: { country: '', province: '', city: 'city_adcode', district: 'district_adcode' },
    precision: accuracy,
    full: true,
  });
  return data;
};

export const copy = (data: any) => {
  const oInput = document.createElement('input');
  oInput.value = data;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.style.display = 'none';
  message.success('复制成功');
};

export const bulkDownload = (data: any, level: string) => {
  const download = document.createElement('a');
  download.download = `${level}.json`;
  download.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
  download.target = '_blank';
  download.rel = 'noreferrer';
  download.click();
};

export const item = () => {
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
};

export const cityValue = (level: string) => {
  return {
    country: [
      { label: '省', value: 'province' },
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ],
    province: [
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ],
    city: [{ label: '县', value: 'district' }],
    district: [],
  }[level];
};

export const sourceOptions = [
  { value: 'DataVSource', label: 'dataV数据源' },
  { value: 'L7Source', label: 'L7数据源' },
];
export const editionOptions = {
  DataVSource: [
    { value: 'areas_v3', label: 'areas_v3' },
    { value: 'areas_v2', label: 'areas_v2' },
  ],
  L7Source: [
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ],
};

export const accuracyOption = [
  { value: 'low', label: '低' },
  { value: 'middle', label: '中' },
  { value: 'high', label: '高' },
];

import { message } from 'antd';
import type { BaseSource } from './data';
import type { DataLevel, DataPrecision } from './data/BaseDataSource';

const DrillingType = {
  country: 'province',
  province: 'city',
  city: 'district',
};

const DrillingCode = {
  province: '',
  city: '',
  district: 'code',
};

const DrillingName = {
  province: '',
  city: '',
  district: 'GID_1',
};

const RollupType: Record<DataLevel, any> = {
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
    shineUpon: { country: '', province: 'GID_1', city: 'GID_2', district: '', jiuduanxian: '' },
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
  GID_1?: number;
}) => {
  const { source, code, type, areaLevel, GID_1 } = option;
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
        GID_1: undefined,
        GID_2: undefined,
      };
    } else {
      if (dataCode === null) {
        return { geoJson: fullData, areaLevel: dataLevel, code: 100000, GID_1: undefined, GID_2: undefined };
      } else {
        const codeJson = JSON.parse(data.features[0].properties.parent).adcode;
        return { geoJson: fullData, code: codeJson, areaLevel: dataLevel, GID_1: undefined, GID_2: undefined };
      }
    }
  }
  const data = await source.getChildrenData({
    parentName: option[DrillingName[areaLevel]],
    parentLevel: RollupType[areaLevel],
    childrenLevel: RollupType[areaLevel],
  });
  return {
    geoJson: data,
    code: option[DrillingCode[areaLevel]] ? option[DrillingCode[areaLevel]] : 100000,
    areaLevel: RollupType[areaLevel],
    GID_1: undefined,
    GID_2: undefined,
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
    shineUpon: { country: '', province: '', city: 'GID_1', district: 'GID_3' },
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

export const item = (value: string, level: string) => {
  if (value === 'DataVSource') {
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
    if (level === 'country') {
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
    } else if (level === 'province') {
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
};

export const cityValue = (level: string) => {
  if (level === 'country') {
    return [
      { label: '省', value: 'province' },
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ];
  }
  if (level === 'province') {
    return [
      { label: '市', value: 'city' },
      { label: '县', value: 'district' },
    ];
  }
  if (level === 'city') {
    return [{ label: '县', value: 'district' }];
  }
  return [];
};

export const sourceOptions = [
  { value: 'DataVSource', label: 'dataV数据源' },
  { value: 'L7Source', label: 'L7数据源' },
];

export const accuracyOption = [
  { value: 'low', label: '低' },
  { value: 'middle', label: '中' },
  { value: 'high', label: '高' },
];

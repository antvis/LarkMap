import { message } from 'antd';
import type { L7Source } from './data';
import type { DataLevel, DataPrecision } from './data/BaseDataSource';
import type { DataVSource } from './data/dataSource';

const DrillingType = {
  country: 'province',
  province: 'city',
  city: 'district',
};

const RollupType: Record<DataLevel, any> = {
  district: 'city',
  city: 'province',
  province: 'country',
  country: '',
  jiuduanxian: '',
};

const parent: Record<DataLevel, string> = {
  country: '',
  province: 'FIRST_GID',
  city: 'GID_1',
  district: 'GID_1',
  jiuduanxian: '',
};

const filterType = {
  district: 'province',
  city: 'province',
  province: 'country',
};
/**
 *
 * @param sourceValue 数据源类型
 * @param code 对应编码
 * @param areaLevel 城市等级
 * @returns
 */
export const getDrillingData = async (
  example: DataVSource,
  L7Source: L7Source,
  sourceValue: string,
  code?: number,
  areaLevel?: DataLevel,
) => {
  if (sourceValue === 'dataV') {
    if (areaLevel !== 'district') {
      const data = await example.gitDataVData(code, 'full');
      const geojson = await data.json();
      return geojson;
    } else {
      const data = await example.gitDataVData(code);
      const geojson = await data.json();
      return geojson;
    }
  }
  const data = await L7Source.getChildrenData({
    parentName: code,
    parentLevel: areaLevel,
    childrenLevel: DrillingType[areaLevel],
    shineUpon: { country: '', province: 'GID_1', city: 'GID_2', district: '', jiuduanxian: '' },
  });

  return {
    GeoJSON: data,
    level: DrillingType[areaLevel],
  };
};

/**
 *
 * @param sourceValue 数据源类型
 * @param code 对应编码
 * @param areaLevel 城市等级
 * @param GID_1 一级编码
 * @param GID_2 二级编码
 * @returns
 */
export const gitRollupData = async (
  example: DataVSource,
  L7Source: L7Source,
  sourceValue: string,
  code: number,
  areaLevel?: string,
  GID_1?: number,
) => {
  if (sourceValue === 'dataV') {
    const datas = {
      geoJson: { type: 'FeatureCollection', features: [] },
      code: 10000,
      areaLevel: 'country',
      GID_1: undefined,
      GID_2: undefined,
    };
    const dataFull = await example.gitDataVData(code, 'full');
    const dataFullJson = await dataFull.json();
    const data = await example.gitDataVData(code);
    const dataJson = await data.json();
    const dataCode = dataJson.features[0].properties.parent.adcode;
    const dataLevel = dataJson.features[0].properties.level;
    if (typeof dataCode !== 'undefined') {
      return { ...datas, geoJson: dataFullJson, code: dataCode, areaLevel: dataLevel };
    } else {
      if (dataCode === null) {
        return { ...datas, geoJson: dataFullJson, areaLevel: dataLevel };
      } else {
        const codeJson = JSON.parse(dataJson.features[0].properties.parent).adcode;
        return { ...datas, geoJson: dataFullJson, code: codeJson, areaLevel: dataLevel };
      }
    }
  }
  if (areaLevel === 'district') {
    const data = await L7Source.getParentData({
      parentName: GID_1,
      parentLevel: RollupType[areaLevel],
      childrenLevel: RollupType[areaLevel],
    });
    return {
      geoJson: data,
      code: code,
      areaLevel: 'city',
      GID_1: data.features[0].properties.GID_1,
      GID_2: data.features[0].properties.GID_2,
    };
  }
  const data = await L7Source.getData({ level: RollupType[areaLevel] });
  return {
    geoJson: data,
    code: 100000,
    areaLevel: RollupType[areaLevel],
    GID_1: undefined,
    GID_2: undefined,
  };
};

export const gitFilterData = async (options: {
  sourceValue: any;
  code: number;
  example: DataVSource;
  L7Source: L7Source;
  areaLevel: string;
  GID_1?: number;
  GID_2?: number;
}) => {
  if (options.sourceValue === 'dataV') {
    const datas = {
      geoJson: { type: 'FeatureCollection', features: [] },
      code: 10000,
      areaLevel: 'country',
      GID_1: undefined,
      GID_2: undefined,
    };
    const data = await options.example.gitDataVData(options.code);
    const dataJson = await data.json();
    const dataCode = dataJson.features[0].properties.adcode;
    const dataLevel = dataJson.features[0].properties.level;
    return { ...datas, geoJson: dataJson, code: dataCode, areaLevel: dataLevel };
  }
  const data = await options.L7Source.getParentData({
    parentName: options[parent[options.areaLevel]],
    parentLevel: filterType[options.areaLevel],
    childrenLevel: filterType[options.areaLevel],
  });
  return {
    geoJson: data,
    code:
      options.areaLevel === 'province' || options.areaLevel === 'city'
        ? 100000
        : data.features[0]?.properties.FIRST_GID,
    name:
      options.areaLevel === 'province' || options.areaLevel === 'city'
        ? `'the People's Republic of China'`
        : data.features[0].properties.ENG_NAME,
    areaLevel: RollupType[options.areaLevel],
    GID_1: data.features[0].properties?.GID_1,
    GID_2: data.features[0].properties?.GID_2,
  };
};

export const downloadData = async (
  example: DataVSource,
  L7Source: L7Source,
  sourceValue: string,
  code: number,
  accuracy: DataPrecision,
  areaLevel?: DataLevel,
) => {
  if (sourceValue === 'dataV') {
    const dataFull = await example.gitDataVData(code, 'full');
    return dataFull;
  } else {
    const data = await L7Source.getChildrenData({
      parentName: code,
      parentLevel: areaLevel,
      childrenLevel: areaLevel,
      shineUpon: { country: '', province: '', city: 'GID_1', district: 'GID_3' },
      precision: accuracy,
    });
    return data;
  }
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
  if (value === 'dataV') {
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
  { value: 'dataV', label: 'dataV数据源' },
  { value: 'thirdParty', label: 'L7数据源' },
];

export const accuracyOption = [
  { value: 'low', label: '低' },
  { value: 'middle', label: '中' },
  { value: 'high', label: '高' },
];

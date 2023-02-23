import { message } from 'antd';
import type { L7Source } from './data';
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
/**
 *
 * @param sourceValue 数据源类型
 * @param code 对应编码
 * @param areaLevel 城市等级
 * @returns
 */
export const getDrillingData = async (L7Source: L7Source, code?: number, full?: boolean, areaLevel?: DataLevel) => {
  const data = await L7Source.getChildrenData({
    parentName: code,
    parentLevel: areaLevel,
    childrenLevel: DrillingType[areaLevel],
    shineUpon: { country: '', province: 'GID_1', city: 'GID_2', district: '', jiuduanxian: '' },
    full: full,
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
export const gitRollupData = async (option: {
  L7Source: L7Source;
  code: number;
  type: boolean;
  areaLevel?: string;
  GID_1?: number;
}) => {
  const { L7Source, code, type, areaLevel, GID_1 } = option;
  if (type) {
    const fullData = await L7Source.getData({ code: code, full: true });
    const data = await L7Source.getData({ code: code });
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
  const data = await L7Source.getChildrenData({
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
  // if (areaLevel === 'district' && type === false) {
  //   const data = await L7Source.getChildrenData({
  //     parentName: GID_1,
  //     parentLevel: RollupType[areaLevel],
  //     childrenLevel: RollupType[areaLevel],
  //   });
  //   return {
  //     geoJson: data,
  //     code: code,
  //     areaLevel: 'city',
  //     GID_1: data.features[0].properties.GID_1,
  //     GID_2: data.features[0].properties.GID_2,
  //   };
  // }
  // const data = await L7Source.getData({ level: RollupType[areaLevel] });
  // return {
  //   geoJson: data,
  //   code: 100000,
  //   areaLevel: RollupType[areaLevel],
  //   GID_1: undefined,
  //   GID_2: undefined,
  // };
};

export const downloadData = async (
  L7Source: L7Source,
  code: number,
  accuracy: DataPrecision,
  areaLevel?: DataLevel,
) => {
  const data = await L7Source.getChildrenData({
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

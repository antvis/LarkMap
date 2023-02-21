import { message } from 'antd';
import type { L7Source } from './data';
import type { DataLevel, DataPrecision } from './data/BaseDataSource';
import type { DataVSource } from './data/dataSource';

/**
 *
 * @param fetchType 数据类型
 * @param version 版本号
 * @param code 数据code
 * @returns
 */
export const getFetch = (fetchType: 'dataV' | 'L7', version: string, code: string | number) => {
  if (fetchType === 'dataV') {
    return `https://geo.datav.aliyun.com/${version}/bound/${code}.json`;
  } else {
    return `https://unpkg.com/${version}/data/${code}.pbf`;
  }
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
  } else {
    if (areaLevel === 'country') {
      const data = await L7Source.getData({ level: 'province' });
      return {
        GeoJSON: data,
        level: 'province',
      };
    } else if (areaLevel === 'province') {
      const data = await L7Source.getData({ level: 'city' });
      const filterData = data.features.filter((item) => {
        return item.properties.GID_1 === code;
      });
      const dataJson = { type: 'FeatureCollection', features: filterData };
      return {
        GeoJSON: dataJson,
        level: 'city',
      };
    } else if (areaLevel === 'city') {
      const data = await L7Source.getData({ level: 'district' });
      console.log(data, 'data=?');
      const filterData = data.features.filter((item) => {
        return item.properties.GID_2 === code;
      });
      const dataJson = { type: 'FeatureCollection', features: filterData };
      return {
        GeoJSON: dataJson,
        level: 'district',
      };
    }
  }
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
  GID_2?: number,
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
  } else {
    if (areaLevel === 'province') {
      const data = await L7Source.getData({ level: 'country' });
      return {
        geoJson: data,
        code: 100000,
        areaLevel: 'country',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (areaLevel === 'city') {
      const data = await L7Source.getData({ level: 'province' });
      return {
        geoJson: data,
        code: 100000,
        areaLevel: 'province',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (areaLevel === 'district') {
      const data = await L7Source.getData({ level: 'city' });
      const filterData = data.features.filter((item) => {
        return item.properties.GID_1 === GID_1;
      });
      const dataJson = { type: 'FeatureCollection', features: filterData };
      return {
        geoJson: dataJson,
        code: code,
        areaLevel: 'city',
        GID_1: dataJson.features[0].properties.GID_1,
        GID_2: dataJson.features[0].properties.GID_2,
      };
    }
  }
};

export const gitFilterData = async (
  sourceValue: string,
  code: number,
  example?: DataVSource,
  L7Source?: L7Source,
  areaLevel?: string,
  GID_1?: number,
  GID_2?: number,
) => {
  if (sourceValue === 'dataV') {
    const datas = {
      geoJson: { type: 'FeatureCollection', features: [] },
      code: 10000,
      areaLevel: 'country',
      GID_1: undefined,
      GID_2: undefined,
    };
    const data = await example.gitDataVData(code);
    const dataJson = await data.json();
    const dataCode = dataJson.features[0].properties.adcode;
    const dataLevel = dataJson.features[0].properties.level;
    return { ...datas, geoJson: dataJson, code: dataCode, areaLevel: dataLevel };
  } else {
    if (areaLevel === 'province') {
      const countryData = await L7Source.getData({ level: 'country' });
      const data = await L7Source.getData({ level: 'jiuduanxian' });
      const newData = { type: 'FeatureCollection', features: [...countryData.features, ...data.features] };
      return {
        geoJson: newData,
        code: 100000,
        areaLevel: 'country',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (areaLevel === 'city') {
      const data = await L7Source.getData({ level: 'province' });
      const filterData = data.features.filter((item) => {
        return item.properties.GID_1 === GID_1;
      });
      const newData = { type: 'FeatureCollection', features: filterData };
      return {
        geoJson: newData,
        code: newData.features[0].properties.FIRST_GID,
        areaLevel: 'province',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (areaLevel === 'district') {
      const data = await L7Source.getData({ level: 'city' });
      const filterData = data.features.filter((item) => {
        return item.properties.GID_2 === GID_2;
      });
      const newData = { type: 'FeatureCollection', features: filterData };
      return {
        geoJson: newData,
        code: newData.features[0].properties.GID_2,
        areaLevel: 'province',
        GID_1: newData.features[0].properties.GID_1,
        GID_2: newData.features[0].properties.GID_2,
      };
    }
  }
};

export const downloadData = async (
  example: DataVSource,
  L7Source: L7Source,
  sourceValue: string,
  code: number,
  accuracy: DataPrecision,
  areaLevel?: string,
) => {
  if (sourceValue === 'dataV') {
    const dataFull = await example.gitDataVData(code, 'full');
    return dataFull;
  } else {
    if (areaLevel === 'country') {
      return await L7Source.getData({ precision: accuracy, level: 'country' });
    }
    if (areaLevel === 'province') {
      return await L7Source.getData({ precision: accuracy, level: 'province' });
    }
    if (areaLevel === 'city') {
      const cityData = await L7Source.getData({ precision: accuracy, level: 'city' });
      const newCityData = cityData.features.filter((item: any) => {
        return item.properties.GID_1 === code;
      });
      const dataJson = { type: 'FeatureCollection', features: newCityData };
      return dataJson;
    }
    if (areaLevel === 'district') {
      const cityData = await L7Source.getData({ precision: accuracy, level: 'district' });
      const newCityData = cityData.features.filter((item: any) => {
        return item.properties.GID_3 === code;
      });
      const dataJson = { type: 'FeatureCollection', features: newCityData };
      return dataJson;
    }
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

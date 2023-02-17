import type { DataSource } from './data/dataSource';

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
export const getDrillingData = async (example: DataSource, sourceValue: string, code?: number, areaLevel?: string) => {
  if (sourceValue === 'dataV') {
    if (areaLevel !== 'district') {
      const data = await fetch(getFetch('dataV', 'areas_v3', `${code}_full`));
      const geojson = await data.json();
      return geojson;
    } else {
      const data = await fetch(getFetch('dataV', 'areas_v3', `${code}`));
      const geojson = await data.json();
      return geojson;
    }
  } else {
    if (areaLevel === 'country') {
      return example.getCityData('province', 100000, '', 'province', 'country');
    } else if (areaLevel === 'province') {
      return example.getCityData('city', code, 'GID_1', 'city');
    } else if (areaLevel === 'city') {
      return example.getCityData('district', code, 'GID_2', 'city1');
    } else if (areaLevel === 'city1') {
      return example.getCityData('district', code, 'GID_3', 'district');
    } else if (areaLevel === 'district') {
      return example.getCityData('district', code, 'GID_3', 'district');
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
  example: DataSource,
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
    const dataFull = await fetch(getFetch('dataV', 'areas_v3', `${code}_full`));
    const dataFullJson = await dataFull.json();
    const data = await fetch(getFetch('dataV', 'areas_v3', `${code}`));
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
      return example.getCityData('country', 100000, 'FIRST_GID', 'country', 'province');
    } else if (areaLevel === 'city') {
      return example.getCityData('province', code, '', 'province');
    } else if (areaLevel === 'city1') {
      return example.getCityData('city', GID_1, 'GID_1', 'city');
    } else if (areaLevel === 'district') {
      return example.getCityData('district', GID_2, 'GID_2', 'city1');
    }
  }
};

export const gitFilterData = async (
  example: DataSource,
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
    const data = await fetch(getFetch('dataV', 'areas_v3', `${code}`));
    const dataJson = await data.json();
    const dataCode = dataJson.features[0].properties.adcode;
    const dataLevel = dataJson.features[0].properties.level;
    return { ...datas, geoJson: dataJson, code: dataCode, areaLevel: dataLevel };
  } else {
    if (areaLevel === 'province') {
      return example.getCityData('country', 100000, 'FIRST_GID', 'country', 'province');
    } else if (areaLevel === 'city') {
      return example.getCityData('country', 100000, 'FIRST_GID', 'country', 'province');
    } else if (areaLevel === 'city1') {
      return example.getCityData('province', GID_1, 'FIRST_GID', 'city');
    } else if (areaLevel === 'district') {
      return example.getCityData('city', GID_2, 'GID_2', 'city1');
    }
  }
};

export const downloadData = async (
  example: DataSource,
  sourceValue: string,
  code: number,
  accuracy: number,
  areaLevel?: string,
  GID_1?: number,
  GID_2?: number,
) => {
  if (sourceValue === 'dataV') {
    const dataFull = await fetch(getFetch('dataV', 'areas_v3', `${code}_full`));
    return dataFull;
  } else {
    if (areaLevel === 'country') {
      return await example.gitData(accuracy, 'country');
    }
    if (areaLevel === 'province') {
      return await example.gitData(accuracy, 'province');
    }
    if (areaLevel === 'city') {
      const cityData = await example.gitData(accuracy, 'city');
      const newCityData = cityData.features.filter((item: any) => {
        return item.properties.GID_1 === code;
      });
      return newCityData;
    }
    if (areaLevel === 'city1') {
      const cityData = await example.gitData(accuracy, 'district');
      const newCityData = cityData.features.filter((item: any) => {
        return item.properties.GID_2 === GID_2;
      });
      return newCityData;
    }
    if (areaLevel === 'district') {
      const cityData = await example.gitData(accuracy, 'district');
      const newCityData = cityData.features.filter((item: any) => {
        return item.properties.GID_3 === code;
      });
      return newCityData;
    }
  }
};

export const adda = (data: any, level: string) => {
  const download = document.createElement('a');
  download.download = `${level}.json`;
  download.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
  download.target = '_blank';
  download.rel = 'noreferrer';
  download.click();
};

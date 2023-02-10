import { simplify } from '@turf/turf';
import { geobuf } from 'geobuf';
import { Pbf } from 'pbf';
import { getFetch } from './units';

export class DataSource {
  public DataVSource = { type: 'FeatureCollection', features: [] };
  public country: any;
  public province: any;
  public city: any;
  public district: any;
  constructor() {
    this.init();
  }

  init = async () => {
    const options = { tolerance: 0.001, highQuality: false };
    const L7Geojson = (data) => {
      return geobuf.decode(new Pbf(data));
    };
    const dataVData = await fetch(getFetch('dataV', 'areas_v3', '100000_full'));
    this.DataVSource = await dataVData.json();

    const L7CountryData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_guojie'));
    const L7CountryDataJson = await L7CountryData.arrayBuffer();
    this.country = simplify(L7Geojson(L7CountryDataJson), options);

    const L7ProvinceData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_sheng'));
    const L7ProvinceDataJson = await L7ProvinceData.arrayBuffer();
    this.province = simplify(L7Geojson(L7ProvinceDataJson), options);

    const L7CityData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_shi'));
    const L7CityDataJson = await L7CityData.arrayBuffer();
    this.city = simplify(L7Geojson(L7CityDataJson), options);

    const L7DistrictData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_xian'));
    const L7DistrictDataJson = await L7DistrictData.arrayBuffer();
    this.district = simplify(L7Geojson(L7DistrictDataJson), options);
  };

  getCityData = (data: any, code: number, codeIndex: string, drillLevel: string, level?: 'country' | 'province') => {
    if (level === 'country') {
      const dataJson = { type: 'FeatureCollection', features: this.province.features };
      return {
        geoJson: dataJson,
        code: 100000,
        areaLevel: 'province',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (level === 'province') {
      const dataJson = { type: 'FeatureCollection', features: this.country.features };
      return {
        geoJson: dataJson,
        code: 100000,
        areaLevel: 'country',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else {
      const filterData = data.features.filter((item) => {
        return item.properties[codeIndex] === code;
      });
      const dataJson = { type: 'FeatureCollection', features: codeIndex === '' ? data.features : filterData };
      return {
        geoJson: dataJson,
        code,
        areaLevel: drillLevel,
        GID_1: dataJson.features[0].properties.GID_1,
        GID_2: dataJson.features[0].properties.GID_2,
      };
    }
  };

  /**
   *
   * @param sourceValue 数据源类型
   * @param code 对应编码
   * @param areaLevel 城市等级
   * @returns
   */
  getDrillingData = async (sourceValue: string, code?: number, areaLevel?: string) => {
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
        return this.getCityData(this.province, 100000, '', 'province', 'country');
      } else if (areaLevel === 'province') {
        return this.getCityData(this.city, code, 'GID_1', 'city');
      } else if (areaLevel === 'city') {
        return this.getCityData(this.district, code, 'GID_2', 'city1');
      } else if (areaLevel === 'city1') {
        return this.getCityData(this.district, code, 'GID_3', 'district');
      } else if (areaLevel === 'district') {
        return this.getCityData(this.district, code, 'GID_3', 'district');
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
  gitRollupData = async (sourceValue: string, code: number, areaLevel?: string, GID_1?: number, GID_2?: number) => {
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
        return this.getCityData(this.country, 100000, 'FIRST_GID', 'country', 'province');
      } else if (areaLevel === 'city') {
        return this.getCityData(this.province, code, '', 'province');
      } else if (areaLevel === 'city1') {
        return this.getCityData(this.city, GID_1, 'GID_1', 'city');
      } else if (areaLevel === 'district') {
        return this.getCityData(this.district, GID_2, 'GID_2', 'city1');
      }
    }
  };
}

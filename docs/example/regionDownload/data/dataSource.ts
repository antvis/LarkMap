import { simplify } from '@turf/turf';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { getFetch } from '../util';

export class DataSource {
  public DataVSource = { type: 'FeatureCollection', features: [] };
  public line: any;
  public country: any;
  public province: any;
  public city: any;
  public district: any;
  constructor() {
    this.init();
  }

  gitCountryData = async () => {
    const options = { tolerance: 0.001, highQuality: false };
    const L7Geojson = (data) => {
      return geobuf.decode(new Pbf(data));
    };
    const L7CountryData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_guojie'));
    const L7CountryDataJson = await L7CountryData.arrayBuffer();
    this.country = await simplify(L7Geojson(L7CountryDataJson), options);
    const data = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_jiuduanxian'));
    const L7LineDataJson = await data.arrayBuffer();
    this.line = await simplify(L7Geojson(L7LineDataJson), options);
    this.country = { type: 'FeatureCollection', features: [...this.country.features, ...this.line.features] };
    return await this.country;
  };

  init = async () => {
    const dataVData = await fetch(getFetch('dataV', 'areas_v3', '100000_full'));
    this.DataVSource = await dataVData.json();
  };

  gitL7GeoJson = async (city: string, cityLevel: string) => {
    const options = { tolerance: 0.001, highQuality: false };
    const L7Geojson = (data) => {
      return geobuf.decode(new Pbf(data));
    };
    const L7CountryData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', city));
    const L7CountryDataJson = await L7CountryData.arrayBuffer();
    this[cityLevel] = await simplify(L7Geojson(L7CountryDataJson), options);
    return await simplify(L7Geojson(L7CountryDataJson), options);
  };

  gitFetchData = async (areaLevel: 'country' | 'province' | 'city' | 'district') => {
    if (areaLevel === 'country') {
      if (this.country) {
        return this.country;
      } else {
        return await this.gitL7GeoJson('2023_guojie', 'country');
      }
    }
    if (areaLevel === 'province') {
      if (this.province) {
        return this.province;
      } else {
        return await this.gitL7GeoJson('2023_sheng', 'province');
      }
    }
    if (areaLevel === 'city') {
      if (this.city) {
        return this.city;
      } else {
        return await this.gitL7GeoJson('2023_shi', 'city');
      }
    }
    if (areaLevel === 'district') {
      if (this.district) {
        return this.district;
      } else {
        return await this.gitL7GeoJson('2023_xian', 'district');
      }
    }
  };

  getCityData = async (
    dataType: 'country' | 'province' | 'city' | 'district',
    code: number,
    codeIndex: string,
    drillLevel: string,
    level?: 'country' | 'province',
  ) => {
    if (level === 'country') {
      const data = await this.gitFetchData('province');
      const dataJson = { type: 'FeatureCollection', features: data.features };
      return {
        geoJson: dataJson,
        code: 100000,
        areaLevel: 'province',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else if (level === 'province') {
      const data = await this.gitFetchData('country');
      const dataJson = { type: 'FeatureCollection', features: data.features };
      return {
        geoJson: dataJson,
        code: 100000,
        areaLevel: 'country',
        GID_1: undefined,
        GID_2: undefined,
      };
    } else {
      const data = await this.gitFetchData(dataType);
      const filterData = data.features.filter((item) => {
        return item.properties[codeIndex] === code;
      });
      const dataJson = { type: 'FeatureCollection', features: codeIndex === '' ? data.features : filterData };
      return {
        geoJson: dataJson,
        code,
        areaLevel: drillLevel,
        GID_1: dataJson?.features[0]?.properties?.GID_1,
        GID_2: dataJson?.features[0]?.properties?.GID_2,
      };
    }
  };
}

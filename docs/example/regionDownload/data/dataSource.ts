import { simplify } from '@turf/turf';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { getFetch } from '../util';

export class DataSource {
  public DataVSource = { type: 'FeatureCollection', features: [] };
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
    return simplify(L7Geojson(L7CountryDataJson), options);
  };

  init = async () => {
    const dataVData = await fetch(getFetch('dataV', 'areas_v3', '100000_full'));
    this.DataVSource = await dataVData.json();
  };

  gitFetchData = async (areaLevel: 'country' | 'province' | 'city' | 'district') => {
    const options = { tolerance: 0.001, highQuality: false };
    const L7Geojson = (data) => {
      return geobuf.decode(new Pbf(data));
    };
    if (areaLevel === 'country') {
      if (this.country) {
        return this.country;
      } else {
        const L7CountryData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_guojie'));
        const L7CountryDataJson = await L7CountryData.arrayBuffer();
        this.country = await simplify(L7Geojson(L7CountryDataJson), options);
        return await simplify(L7Geojson(L7CountryDataJson), options);
      }
    }
    if (areaLevel === 'province') {
      if (this.province) {
        return this.province;
      } else {
        const L7ProvinceData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_sheng'));
        const L7ProvinceDataJson = await L7ProvinceData.arrayBuffer();
        this.province = await simplify(L7Geojson(L7ProvinceDataJson), options);
        return await simplify(L7Geojson(L7ProvinceDataJson), options);
      }
    }
    if (areaLevel === 'city') {
      if (this.city) {
        return this.city;
      } else {
        const L7CityData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_shi'));
        const L7CityDataJson = await L7CityData.arrayBuffer();
        this.city = await simplify(L7Geojson(L7CityDataJson), options);
        return await simplify(L7Geojson(L7CityDataJson), options);
      }
    }
    if (areaLevel === 'district') {
      if (this.district) {
        return this.district;
      } else {
        const L7DistrictData = await fetch(getFetch('L7', 'xinzhengqu@1.0.0', '2023_xian'));
        const L7DistrictDataJson = await L7DistrictData.arrayBuffer();
        this.district = await simplify(L7Geojson(L7DistrictDataJson), options);
        return await simplify(L7Geojson(L7DistrictDataJson), options);
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
        GID_1: dataJson.features[0].properties.GID_1,
        GID_2: dataJson.features[0].properties.GID_2,
      };
    }
  };
}

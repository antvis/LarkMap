import { simplify } from '@turf/turf';
import geobuf from 'geobuf';
import Pbf from 'pbf';

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
    const dataVData = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`);
    this.DataVSource = await dataVData.json();

    const L7CountryData = await fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_guojie.pbf');
    const L7CountryDataJson = await L7CountryData.arrayBuffer();
    this.country = simplify(L7Geojson(L7CountryDataJson), options);

    const L7ProvinceData = await fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_sheng.pbf');
    const L7ProvinceDataJson = await L7ProvinceData.arrayBuffer();
    this.province = simplify(L7Geojson(L7ProvinceDataJson), options);
    console.log(simplify(L7Geojson(L7ProvinceDataJson), options), '12111');

    const L7CityData = await fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_shi.pbf');
    const L7CityDataJson = await L7CityData.arrayBuffer();
    this.city = simplify(L7Geojson(L7CityDataJson), options);

    const L7DistrictData = await fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_xian.pbf');
    const L7DistrictDataJson = await L7DistrictData.arrayBuffer();
    this.district = simplify(L7Geojson(L7DistrictDataJson), options);
  };

  getCityData = (data: any, code: number, codeIndex: string, drillLevel: string) => {
    const filterData = data.features.filter((item) => {
      return item.properties[codeIndex] === code;
    });
    const dataJson = { type: 'FeatureCollection', features: filterData };
    console.log(dataJson);
    return {
      geoJson: dataJson,
      code,
      areaLevel: drillLevel,
    };
  };
  getDrillingData = async (sourceValue: string, code?: number, areaLevel?: string) => {
    if (sourceValue === 'dataV') {
      if (areaLevel !== 'district') {
        const data = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`);
        const geojson = await data.json();
        return geojson;
      } else {
        const data = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`);
        const geojson = await data.json();
        return geojson;
      }
    } else {
      console.log(areaLevel);
      if (areaLevel === 'country') {
        console.log(1111);
        return {
          geoJson: this.province,
          code: 100000,
          areaLevel: 'province',
        };
      } else if (areaLevel === 'province') {
        return this.getCityData(this.city, code, 'GID_1', 'city');
      } else if (areaLevel === 'city') {
        return this.getCityData(this.district, code, 'GID_2', 'district');
      } else if (areaLevel === 'district') {
        return this.getCityData(this.district, code, 'GID_3', 'district');
      }
    }
  };
  gitRollupData = async (sourceValue: string, code: number) => {
    if (sourceValue === 'dataV') {
      const dataFull = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`);
      const dataFullJson = await dataFull.json();
      const data = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`);
      const dataJson = await data.json();
      const dataCode = dataJson.features[0].properties.parent.adcode;
      const dataLevel = dataJson.features[0].properties.level;
      if (typeof dataCode !== 'undefined') {
        return {
          geoJson: dataFullJson,
          dataCode,
          dataLevel,
        };
      } else {
        if (dataCode === null) {
          return {
            geoJson: dataFullJson,
            dataCode: 100000,
            dataLevel,
          };
        } else {
          const codeJson = JSON.parse(dataJson.features[0].properties.parent).adcode;
          return {
            geoJson: dataFullJson,
            dataCode: codeJson,
            dataLevel,
          };
        }
      }
    }
  };
}

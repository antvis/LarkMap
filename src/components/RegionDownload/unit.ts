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

  init() {
    fetch(`https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json`)
      .then((response) => response.json())
      .then((data: any) => {
        console.log('=>Data', data);
        this.DataVSource = data;
      });

    fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_guojie.pbf')
      .then((response) => response.arrayBuffer())
      .then((data: any) => {
        const geojson = geobuf.decode(new Pbf(data));
        const options = { tolerance: 0.001, highQuality: false };
        const simplified = simplify(geojson, options);
        this.country = simplified;
      });
    fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_sheng.pbf')
      .then((response) => response.arrayBuffer())
      .then((data: any) => {
        const geojson = geobuf.decode(new Pbf(data));
        const options = { tolerance: 0.001, highQuality: false };
        const simplified = simplify(geojson, options);
        this.province = simplified;
      });
    fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_shi.pbf')
      .then((response) => response.arrayBuffer())
      .then((data: any) => {
        const geojson = geobuf.decode(new Pbf(data));
        const options = { tolerance: 0.001, highQuality: false };
        const simplified = simplify(geojson, options);
        this.city = simplified;
      });
    fetch('https://unpkg.com/xinzhengqu@1.0.0/data/2023_xian.pbf')
      .then((response) => response.arrayBuffer())
      .then((data: any) => {
        const geojson = geobuf.decode(new Pbf(data));
        const options = { tolerance: 0.001, highQuality: false };
        const simplified = simplify(geojson, options);
        this.district = simplified;
      });
  }
  getProvinceData() {
    console.log('=>get', this.country);
    return this.DataVSource;
  }
}

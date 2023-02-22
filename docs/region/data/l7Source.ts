import type { FeatureCollection, Geometry, GeometryCollection } from '@turf/helpers';
import { simplify } from '@turf/turf';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import type { ChildrenDataOptions, DataLevel, DataPrecision, IDataOptions } from './BaseDataSource';
import BaseSource from './BaseDataSource';

const DataConfig = {
  dataInfo: '数据来源：公众号：锐多宝的地理空间 https://github.com/ruiduobao/shengshixian.com',
  url: 'https://unpkg.com',
};

const DataAccuracy: Record<DataPrecision, number> = {
  high: 0.0001,
  middle: 0.005,
  low: 0.01,
};

const DataLevelRecord: Record<DataLevel, string> = {
  country: '2023_guojie',
  province: '2023_sheng',
  city: '2023_shi',
  district: '2023_xian',
  jiuduanxian: '2023_jiuduanxian',
};

// `https://unpkg.com/${version}/data/${code}.pbf`;

export class L7Source extends BaseSource {
  public async getParentData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const {
      parentName,
      parentLevel,
      childrenLevel,
      shineUpon = { country: '', province: 'FIRST_GID', city: 'GID_1', district: 'GID_2' },
      precision = 'low',
    } = ChildrenDataOptions;
    const rawData = await this.getData({ level: childrenLevel, precision });
    //TODO 根据 parentName, parenerLevel 进行数据过滤
    if (shineUpon[parentLevel]) {
      const data = rawData.features.filter((v) => {
        return v.properties[shineUpon[parentLevel]] === parentName;
      });
      const newData = { type: 'FeatureCollection', features: data } as FeatureCollection<
        Geometry | GeometryCollection,
        Record<string, any>
      >;
      return newData;
    }
    return rawData;
  }
  // 使用 Low 精度数据进行数据渲染
  public async getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    return this.getData(options);
  }
  public async getData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const { level, precision = 'low' } = options;
    const data = await this.fetchData(level);
    return this.simplifyData(data, precision);
  }
  // 获取子级数据,数据下载时使用

  public async getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const {
      parentName,
      parentLevel,
      childrenLevel,
      shineUpon = { country: '', province: 'FIRST_GID', city: 'GID_1', district: 'GID_2' },
      precision = 'low',
    } = ChildrenDataOptions;
    const rawData = await this.getData({ level: childrenLevel, precision });
    //TODO 根据 parentName, parenerLevel 进行数据过滤
    if (shineUpon[parentLevel]) {
      const data = rawData.features.filter((v) => {
        return v.properties[shineUpon[parentLevel]] === parentName;
      });
      const newData = { type: 'FeatureCollection', features: data } as FeatureCollection<
        Geometry | GeometryCollection,
        Record<string, any>
      >;
      return newData;
    }
    return rawData;
  } /*  */

  private fetchArrayBuffer = async (url: string) => {
    const res = await fetch(url);
    return await res.arrayBuffer();
  };
  // 获取原始数据，数据解析并缓存
  private async fetchData(
    level: DataLevel,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    if (this.data[level]) {
      return this.data[level];
    }
    const url = `${DataConfig.url}/${this.version}/data/${DataLevelRecord[level]}.pbf`;
    const data = await this.fetchArrayBuffer(url);
    const jsonData = await geobuf.decode(new Pbf(data));
    this.data[level] = await jsonData;
    return jsonData; // 原始数据
  }

  private simplifyData(data: FeatureCollection, precision: DataPrecision) {
    return simplify(data, { tolerance: DataAccuracy[precision] as number, highQuality: false });
  }
}

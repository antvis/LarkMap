import type { FeatureCollection, Geometry, GeometryCollection } from '@turf/helpers';

export interface ISourceOptions {
  dataInfo: string;
  version: string;
}

export type DataPrecision = 'high' | 'middle' | 'low';
export interface IDataOptions {
  precision: DataPrecision;
  level: DataLevel;
}

export interface ChildrenDataOptions {
  parentName: string;
  parenerLevel: DataLevel;
  childrenLevel: DataLevel;
  precision: DataPrecision;
}

export type DataLevel = 'country' | 'province' | 'city' | 'district' | 'jiuduanxian';

export default abstract class BaseSource {
  static dataInfo: string;
  private options: Partial<ISourceOptions> = {};
  protected data: Record<DataLevel, FeatureCollection>;
  protected version: string;

  constructor(options: ISourceOptions) {
    this.options = options;
    this.version = options.version;
  }

  // 获取渲染数据
  public abstract getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>>;

  // 根据精度, level 获取下载数据
  public abstract getData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>>;

  public abstract getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>>;

  protected fetchJsonData = async (url: string) => {
    const res = await fetch(url);
    return await res.json();
  };
}

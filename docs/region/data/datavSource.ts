/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FeatureCollection, Geometry, GeometryCollection } from '@turf/helpers';
import type { ChildrenDataOptions, IDataOptions, ISourceOptions } from './BaseDataSource';
import BaseSource from './BaseDataSource';

const DataConfig = {
  desc: {
    text: 'DataV',
    href: 'https://datav.aliyun.com/portal/school/atlas/area_selector',
  },
  url: 'https://geo.datav.aliyun.com',
};

export class DataVSource extends BaseSource {
  public info = DataConfig;
  protected getDefaultOptions(): Partial<ISourceOptions> {
    return {
      version: 'areas_v3',
    };
  }
  public getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    throw new Error('Method not implemented.');
  }

  public getData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const { code, full } = options;
    const data = this.fetchData(code, full);
    return data;
  }

  public getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const { parentName, full } = ChildrenDataOptions;
    const data = this.fetchData(parentName, full);
    return data;
  }

  public async fetchData(
    code: number,
    full?: boolean,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    const url = `${DataConfig.url}/${this.version}/bound/${code}.json`;
    const fullURL = `${DataConfig.url}/${this.version}/bound/${code}_full.json`;
    if (full) {
      const data = await this.fetchJsonData(fullURL);
      return data;
    } else {
      const data = await this.fetchJsonData(url);
      return data;
    }
  }
}

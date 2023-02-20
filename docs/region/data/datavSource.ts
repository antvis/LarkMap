/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FeatureCollection, Geometry, GeometryCollection } from '@turf/helpers';
import type { ChildrenDataOptions, IDataOptions } from './BaseDataSource';
import BaseSource from './BaseDataSource';

export class DataVSource extends BaseSource {
  // @ts-ignore
  public getRenderData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    throw new Error('Method not implemented.');
  }
  public getData(
    options: Partial<IDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    throw new Error('Method not implemented.');
  }
  public getChildrenData(
    ChildrenDataOptions: Partial<ChildrenDataOptions>,
  ): Promise<FeatureCollection<Geometry | GeometryCollection, Record<string, any>>> {
    throw new Error('Method not implemented.');
  }
}

// export { DataVSource } from './dataSource';
import { DataVSource } from './datavSource';
import { L7Source } from './l7Source';
export { default as BaseSource } from './BaseDataSource';
export const DataSourceMap = {
  DataVSource,
  L7Source,
};
export type SourceType = keyof typeof DataSourceMap;

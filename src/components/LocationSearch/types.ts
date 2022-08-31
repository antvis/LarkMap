import type { SelectProps } from 'antd';

export interface LocationSearchProps extends Omit<SelectProps, 'onChange' | 'onSearch'> {
  /**
   * 高德搜索服务的API key 值
   */
  searchParams: GaodeLocationSearchParams;

  /**
   * 选项中是否展示地址
   */
  showAddress?: boolean;

  /**
   * 当下拉选项发生改变的回调
   * @param options
   */
  onSearchFinish?: (options: LocationSearchOption[]) => void;

  /**
   * 选项发生改变时的回调
   * @param name
   * @param option
   */
  onChange?: (name?: string | null, option?: LocationSearchOption | null) => void;
}

export type GaodeLocationSearchParams = {
  key: string;
  sig?: string;
  keywords?: string;
  types?: string;
  city?: string;
  citylimit?: boolean;
  [key: string]: any;
};

export type LocationSearchOption = {
  name: string;
  id: string;
  location: string;
  longitude: number;
  latitude: number;
  type: string;
  typecode: string;
  pname: string;
  cityname: string;
  adname: string;
  address: string;
  pcode: string;
  citycode: string;
  adcode: string;
};

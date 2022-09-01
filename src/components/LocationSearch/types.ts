import type { SelectProps } from 'antd';

export interface LocationSearchProps extends Omit<SelectProps, 'onChange' | 'onSearch'> {
  /**
   * 高德搜索服务的API key 值
   */
  searchParams: GaodeLocationSearchParams;

  /**
   * 是否展示省市区地址
   */
  showDistrict?: boolean;

  /**
   * 选项中是否展示详细地址
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
  onChange?: (name?: string, option?: LocationSearchOption) => void;
}

export type GaodeLocationSearchParams = {
  key: string;
  keywords?: string;
  location?: string;
  type?: string;
  city?: string;
  citylimit?: boolean;
  sig?: string;
  datatype?: string;
  [key: string]: any;
};

export type LocationSearchOption = {
  id: string;
  name: string;
  location: string;
  longitude: number;
  latitude: number;
  district: string;
  adcode: string;
  address: string;
};

import type { SelectProps } from 'antd';
import type { CustomControlProps } from '../CustomControl/types';

export interface LocationSearchProps
  extends Pick<CustomControlProps, 'position' | 'className' | 'style'>,
    Omit<SelectProps, 'onChange' | 'onSearch'> {
  /**
   * 高德搜索服务的API key 值
   */
  gaodeParams: GaodeLocationSearchParams;

  /**
   * 选项中是否展示地址
   */
  showAddress?: boolean;

  /**
   * 当下拉选项发生改变的回调
   * @param options
   */
  onOptionsChange?: (options: LocationSearchOption[]) => void;

  /**
   * 选项发生改变时的回调
   * @param id
   * @param option
   */
  onChange?: (id?: string | null, option?: LocationSearchOption | null) => void;
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
  id: string;
  parent: string | any[];
  childtype: string | any[];
  name: string;
  type: string;
  typecode: string;
  biz_type: any[];
  address: string;
  longitude: number;
  latitude: number;
  location: string;
  tel: string | any[];
  pname: string;
  cityname: string;
  adname: string;
  importance: any[];
  shopid: any[];
  shopinfo: string;
  poiweight: any[];
  distance: any[];
  parking_type?: string;
  biz_ext: {
    rating: string | any[];
    cost: any[];
  };
  photos: {
    title: any[];
    url: string;
  }[];
};

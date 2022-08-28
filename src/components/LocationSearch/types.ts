import type { SelectProps } from 'antd';
import type { CustomControlProps } from '../CustomControl/types';

export interface LocationSearchProps
  extends Pick<CustomControlProps, 'position' | 'className' | 'style'>,
    SelectProps {
  /**
   * 高德搜索服务的API key 值
   */
  gaodeParams: GaodeLocationSearchParams;
  showAddress: boolean;
}

export type GaodeLocationSearchParams =  {
  key: string;
  sig?: string;
  keywords?: string;
  types?: string;
  city?: string;
  citylimit?: boolean;
  [key: string]: any;
}

export type LocationSearchOption = {
  id: string;
  parent: string | any[];
  childtype: string | any[];
  name: string;
  type: string;
  typecode: string;
  biz_type: any[];
  address: string;
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

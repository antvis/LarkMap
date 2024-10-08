import type { IMapConfig } from '@antv/l7';
import { BaiduMap, GaodeMap, GaodeMapV1, GaodeMapV2, Map, TencentMap } from '@antv/l7';
import type { LarkMapProps } from './types';

export const createMap = async (mapType: LarkMapProps['mapType'], mapOptions: Partial<IMapConfig>) => {
  if (mapType === 'Map') {
    return new Map(mapOptions);
  }

  if (mapType === 'Gaode') {
    return new GaodeMap(mapOptions);
  } else if (mapType === 'GaodeV1') {
    return new GaodeMapV1(mapOptions);
  } else if (mapType === 'GaodeV2') {
    return new GaodeMapV2(mapOptions);
  }

  if (mapType === 'Tencent') {
    return new TencentMap(mapOptions);
  }

  if (mapType === 'Baidu') {
    return new BaiduMap(mapOptions);
  }

  return Promise.resolve(import('@antv/l7')).then(({ Mapbox }) => {
    return new Mapbox(mapOptions);
  });
};

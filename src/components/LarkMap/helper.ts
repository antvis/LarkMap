import type { IMapConfig } from '@antv/l7';
import { GaodeMap, GaodeMapV2, Map } from '@antv/l7-maps';
import type { LarkMapProps } from './types';

export const createMap = async (mapType: LarkMapProps['mapType'], mapOptions: Partial<IMapConfig>) => {
  if (mapType === 'Map') {
    return new Map(mapOptions);
  }

  if (mapType === 'GaodeV1') {
    return new GaodeMap(mapOptions);
  } else if (mapType === 'GaodeV2') {
    return new GaodeMapV2(mapOptions);
  }

  return Promise.resolve(import('@antv/l7-maps')).then(({ Mapbox }) => {
    return new Mapbox(mapOptions);
  });
};

import type { IMapConfig } from '@antv/l7';
import { GaodeMap, GaodeMapV2, Map } from '@antv/l7-maps';
import type { LarkMapProps } from './types';

export const createMap = async (mapType: LarkMapProps['mapType'], mapConfig: Partial<IMapConfig>) => {
  if (mapType === 'Map') {
    return new Map(mapConfig);
  }

  if (mapType === 'GaodeV1') {
    return new GaodeMap(mapConfig);
  } else if (mapType === 'GaodeV2') {
    return new GaodeMapV2(mapConfig);
  }

  return Promise.resolve(import('@antv/l7-maps/es/mapbox')).then((mapbox) => {
    return new mapbox.default(mapConfig);
  });
};

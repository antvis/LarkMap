import type { Layer } from '../../../../utils';
import { useLayerManager } from '../use-layer-manager';

export const useLayer = <T extends Layer = Layer>(id: string): T => {
  const layerManager = useLayerManager();

  const layer = layerManager.getLayer(id);

  return layer as T;
};

import { useEffect, useState } from 'react';
import type { Layer } from '../../../../types';
import { useLayerManager } from '../use-layer-manager';

export const useLayer = <T extends Layer = Layer>(id: string): T | undefined => {
  const layerManager = useLayerManager();
  const [layer, setLayer] = useState<T | undefined>(layerManager.getLayer(id) as T);

  useEffect(() => {
    const onLayerAdd = (_layer: T) => {
      if (id === _layer.id) {
        setLayer(_layer);
      }
    };
    const onLayerRemove = (layerId: string) => {
      if (id === layerId) {
        setLayer(undefined);
      }
    };
    const _layer = layerManager.getLayer(id);

    if (_layer) {
      setLayer(_layer as T);
    } else {
      layerManager.on('add', onLayerAdd);
      layerManager.on('remove', onLayerRemove);
    }

    return () => {
      if (_layer === undefined) {
        layerManager.off('add', onLayerAdd);
        layerManager.off('remove', onLayerRemove);
      }
    };
  }, [id]);

  return layer;
};

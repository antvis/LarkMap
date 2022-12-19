import { useEffect, useState } from 'react';
import { useLayerManager } from '../use-layer-manager';

export const useLayerList = () => {
  const layerManager = useLayerManager();
  const [layerList, setLayerList] = useState(layerManager?.getLayers() || []);

  useEffect(() => {
    if (layerManager) {
      const onUpdateLayerList = () => {
        setLayerList(layerManager.getLayers());
      };
      layerManager.on('add', onUpdateLayerList);
      layerManager.on('remove', onUpdateLayerList);
      return () => {
        layerManager.off('add', onUpdateLayerList);
        layerManager.off('remove', onUpdateLayerList);
      };
    }
  }, [layerManager]);

  return layerList;
};

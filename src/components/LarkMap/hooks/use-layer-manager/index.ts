import { useContext } from 'react';
import { LarkMapContext } from '../../index';

export const useLayerManager = () => {
  const { layerManager } = useContext(LarkMapContext);

  return layerManager;
};

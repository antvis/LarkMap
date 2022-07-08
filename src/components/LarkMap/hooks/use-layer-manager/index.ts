import { useContext } from 'react';
import { LarkMapContext } from '../../index';

export const useLayerManager = () => {
  const context = useContext(LarkMapContext);
  if (!context) {
    throw new Error('The useLayerManager must be used in the LarkMap container');
  }
  const { layerManager } = context;

  return layerManager;
};

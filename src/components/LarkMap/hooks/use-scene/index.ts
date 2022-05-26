import { useContext } from 'react';
import { LarkMapContext } from '../../index';

export const useScene = () => {
  const { scene } = useContext(LarkMapContext);

  return scene;
};

import React from 'react';
import { syncScene } from './helper';
import type { SyncSceneProps } from './types';
export const SyncScene: React.FC<SyncSceneProps> = ({ scenes, options }) => {
  React.useEffect(() => {
    const callback = syncScene(scenes, options);
    return callback;
  }, [scenes, options]);

  return <></>;
};

export { syncScene, SyncSceneProps };

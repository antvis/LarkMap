import React from 'react';
import { syncScene } from './helper';
import type { SyncSceneProps } from './types';
export const SyncScene: React.FC<SyncSceneProps> = ({ scenes, options, syncCallback }) => {
  React.useEffect(() => {
    const callback = syncScene(scenes, options, syncCallback);
    return callback;
  }, [scenes, options, syncCallback]);

  return <></>;
};

export { syncScene };

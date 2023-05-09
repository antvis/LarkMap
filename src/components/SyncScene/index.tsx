/*
 * @Author       : 青艺 wangxueyi.wxy@mybank.cn
 * @Date         : 2023-05-09 10:37:18
 * @LastEditors  : 青艺 wangxueyi.wxy@mybank.cn
 * @LastEditTime : 2023-05-09 10:51:09
 * @FilePath     : /OpenSource/LarkMap/src/components/Tool/SyncScene/index.tsx
 * @name         :
 * @Description  :
 */
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

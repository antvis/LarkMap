/*
 * @Author       : 青艺 wangxueyi.wxy@mybank.cn
 * @Date         : 2023-05-09 10:37:19
 * @LastEditors  : 青艺 wangxueyi.wxy@mybank.cn
 * @LastEditTime : 2023-05-09 10:41:34
 * @FilePath     : /OpenSource/LarkMap/src/components/Tool/SyncScene/types.ts
 * @name         :
 * @Description  :
 */
import type { Scene } from '@antv/l7';

export interface ISyncSceneOptions {
  zoomGap?: number;
  mainIndex?: number;
}
export interface SyncSceneProps {
  scenes: Scene[];
  options?: ISyncSceneOptions;
}

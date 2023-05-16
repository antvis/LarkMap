/*
 * @Author       : 青艺 wangxueyi.wxy@mybank.cn
 * @Date         : 2023-05-16 09:51:02
 * @LastEditors  : 青艺 wangxueyi.wxy@mybank.cn
 * @LastEditTime : 2023-05-16 11:08:24
 * @FilePath     : /LarkMap/src/components/Control/EagleEyeControl/hooks.ts
 * @name         :
 * @Description  :
 */

import type { Bounds, Scene } from '@antv/l7';
import { DOM } from '@antv/l7-utils';
import React from 'react';
import { getCanvasBound } from './helper';
import type { EagleEyeOptions } from './types';

/**
 * 创建容器，根据 canvas box 定位，与显示大小
 */
export function useEagleBox(eagleScene: Scene, element: HTMLDivElement, bounds: Bounds, options: EagleEyeOptions) {
  React.useEffect(() => {
    const { padding } = options;
    eagleScene.fitBounds(bounds, { padding });
    const canvasBox = getCanvasBound(eagleScene, bounds);
    const style = DOM.css2Style({
      left: canvasBox[0][0] + 'px',
      top: canvasBox[0][1] + 'px',
      right: canvasBox[1][0] + 'px',
      bottom: canvasBox[1][1] + 'px',
    });
    DOM.addStyle(element, style);
  }, [options, eagleScene, element, bounds]);
}
/**
 * 同步主地图、鹰眼地图与拖拽 box
 */
export function useSyncScenes(mainScene, eagleScene, element, options: EagleEyeOptions) {
  const [bounds, setBounds] = React.useState<Bounds>();
  React.useEffect(() => {
    const handler = () => {
      const box = mainScene.getBounds();
      setBounds(box);
    };
    mainScene.on('mapmove', handler);
    mainScene.on('zoomchange', handler);
    return () => {
      mainScene.off('mapmove', handler);
      mainScene.off('zoomchange', handler);
    };
  }, [mainScene]);

  React.useEffect(() => {
    const handler = () => {
      const box = eagleScene.getBounds();
      setBounds(box);
    };
    eagleScene.on('mapmove', handler);
    eagleScene.on('zoomchange', handler);

    return () => {
      eagleScene.off('mapmove', handler);
      eagleScene.off('zoomchange', handler);
    };
  }, [eagleScene]);

  return bounds;
}

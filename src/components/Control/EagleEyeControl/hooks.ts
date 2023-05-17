/*
 * @Author       : 青艺 wangxueyi.wxy@mybank.cn
 * @Date         : 2023-05-16 09:51:02
 * @LastEditors  : 青艺 wangxueyi.wxy@mybank.cn
 * @LastEditTime : 2023-05-17 15:36:19
 * @FilePath     : /LarkMap/src/components/Control/EagleEyeControl/hooks.ts
 * @name         :
 * @Description  :
 */

import type { Bounds, Scene } from '@antv/l7';
import { DOM } from '@antv/l7-utils';
import { useMutationObserver } from 'ahooks';
import type { SyncOptions } from 'components/SyncScene/types';
import React from 'react';
import { syncScene } from '../../SyncScene/helper';
import { boundsPanByPixel, getCanvasBound, getCanvasRect, validRect } from './helper';
import type { CanvasBoxRect, EagleEyeOptions, Position } from './types';
const draggingStyleStr = DOM.css2Style({
  border: '1px solid #ff000060',
});

/**
 * 创建容器，根据 canvas box 定位，与显示大小
 */
export function useEagleBox(eagleScene: Scene, element: HTMLDivElement, bounds: Bounds, options: EagleEyeOptions) {
  const canvasMapRectRef = React.useRef<CanvasBoxRect>(getCanvasRect(eagleScene));
  const eagleBoxRectRef = React.useRef<CanvasBoxRect>(getCanvasRect(eagleScene));

  useMutationObserver(
    () => {
      const rect = getCanvasRect(eagleScene);
      canvasMapRectRef.current = rect;
    },
    eagleScene.getContainer(),
    { attributes: true },
  );

  React.useEffect(() => {
    if (!element) return;
    const boxRect = getCanvasBound(eagleScene, bounds);
    const boxFinalRect = validRect(boxRect, canvasMapRectRef.current);
    eagleBoxRectRef.current = boxFinalRect;
  }, [options, eagleScene, element, bounds]);

  return eagleBoxRectRef.current;
}
/**
 * 同步主地图、鹰眼地图与拖拽 box
 */
export function useSyncScenes(mainScene, eagleScene, position: Position, options: EagleEyeOptions) {
  const [bounds, setBounds] = React.useState<Bounds>();
  const { padding } = options;

  // FIXME: 只支持 mapbox ，高德地图存在问题
  const handler = React.useCallback((scene: Scene, syncOptions: SyncOptions) => {
    const { bounds: movedBounds } = syncOptions;
    if (scene === mainScene) {
      // scene.fitBounds(movedBounds, {
      //   animate: false,
      //   // FIXME: 不支持负的计算
      //   padding: {
      //     // top: -padding.top,
      //     // right: -padding.right,
      //     // left: -padding.left,
      //     // bottom: -padding.bottom,
      //   },
      // });
    } else {
      scene.fitBounds(movedBounds, { animate: false, padding: padding });
    }
    setBounds(movedBounds);
  }, []);

  // 主地图 和 鹰眼地图的同步
  React.useEffect(() => {
    if (!mainScene || !eagleScene) return;
    const destroy = syncScene([mainScene, eagleScene], { mainIndex: 0, zoomGap: 0 }, handler);
    return destroy;
  }, [mainScene, eagleScene, handler]);

  React.useEffect(() => {
    if (eagleScene && position) {
      const newBounds = boundsPanByPixel(eagleScene, bounds, position);
      eagleScene.fitBounds(newBounds, { animate: false, padding: padding });
      setBounds(newBounds);
    }
  }, [position]);

  return bounds;
}

export const useDraggable = (elementRef: React.MutableRefObject<HTMLElement | null>): Position => {
  const startPositionRef = React.useRef<Position>({ x: 0, y: 0 });
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  React.useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setPosition({ x: 0, y: 0 });
      startPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };
    const handleMouseUp = (event: MouseEvent) => {
      setIsDragging(false);
      setPosition({
        x: event.clientX - startPositionRef.current.x,
        y: event.clientY - startPositionRef.current.y,
      });
      startPositionRef.current = {
        x: 0,
        y: 0,
      };
    };

    element.addEventListener('dragstart', handleMouseDown);
    document.body.addEventListener('dragend', handleMouseUp);

    return () => {
      element.removeEventListener('dragstart', handleMouseDown);
      document.body.removeEventListener('dragend', handleMouseUp);
    };
  }, [elementRef, isDragging]);

  return position;
};

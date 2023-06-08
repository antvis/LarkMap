/*
 * @Author       : 青艺 wangxueyi.wxy@mybank.cn
 * @Date         : 2023-05-16 09:51:02
 * @LastEditors  : 青艺 wangxueyi.wxy@mybank.cn
 * @LastEditTime : 2023-06-08 16:32:10
 * @FilePath     : /LarkMap/src/components/Control/EagleEyeControl/hooks.ts
 * @name         :
 * @Description  :
 */

import type { Scene } from '@antv/l7';
import { useMutationObserver } from 'ahooks';
import type { SyncOptions } from 'components/SyncScene/types';
import React from 'react';
import { syncScene } from '../../SyncScene/helper';
import { getCanvasRect, getRectCornerCoord } from './helper';
import type { CanvasBoxRect, EagleEyeOptions, Position } from './types';

/**
 * 创建容器，根据 canvas box 定位，与显示大小
 */
export function useEagleBox(eagleScene: Scene, mainScene: Scene, options: EagleEyeOptions): CanvasBoxRect {
  const [eagleMapRect, setEagleMapRect] = React.useState<CanvasBoxRect>(getCanvasRect(eagleScene));
  const [mainMapRect, setMainMapRect] = React.useState<CanvasBoxRect>(getCanvasRect(mainScene));
  const [eagleBoxRect, setEagleBoxRect] = React.useState<CanvasBoxRect>(eagleMapRect);

  useMutationObserver(
    () => {
      const rect = getCanvasRect(eagleScene);
      setEagleMapRect(rect);
    },
    eagleScene.getContainer(),
    { attributes: true, attributeFilter: ['style'] },
  );

  useMutationObserver(
    () => {
      const rect = getCanvasRect(mainScene);
      setMainMapRect(rect);
    },
    mainScene.getContainer(),
    { attributes: true, attributeFilter: ['style'] },
  );

  React.useEffect(() => {
    const { control, interval } = options;
    // 主地图宽高比例
    const scale = mainMapRect.width / mainMapRect.height;
    let width,
      height,
      x = 0,
      y = 0;
    if (control === 'vertical') {
      height = eagleMapRect.height - interval * 2;
      width = height * scale;
      x = (eagleMapRect.width - width) / 2;
      y = interval;
    } else {
      width = eagleMapRect.width - interval * 2;
      height = width / scale;
      y = (eagleMapRect.height - height) / 2;
      x = interval;
    }
    setEagleBoxRect({
      x,
      y,
      width,
      height,
    });
  }, [eagleMapRect, mainMapRect, options]);

  return eagleBoxRect;
}
/**
 * 同步主地图、鹰眼地图与拖拽 box
 */
export function useSyncScenes(mainScene: Scene, eagleScene: Scene, boxRect: CanvasBoxRect) {
  const padding = React.useMemo(() => {
    const { x, y } = boxRect ?? {};
    return {
      top: y,
      left: x,
      right: x,
      bottom: y,
    };
  }, [boxRect]);

  // FIXME: 只支持 mapbox ，高德地图存在问题
  const handler = React.useCallback(
    (scene: Scene, syncOptions: SyncOptions) => {
      const { bounds: movedBounds } = syncOptions;
      if (scene === mainScene) {
        // 计算 padding 后的 bounds，主地图同步该 bounds
        const [wsCorner, enCorner] = getRectCornerCoord(boxRect);
        const wsCoord = eagleScene.containerToLngLat(wsCorner);
        const enCoord = eagleScene.containerToLngLat(enCorner);
        mainScene.fitBounds(
          [
            [wsCoord.lng, wsCoord.lat],
            [enCoord.lng, enCoord.lat],
          ],
          { animate: false },
        );
      } else {
        // FIXME:  如果主地图移动到了最大 bounds，eagle box 需要变为整个 地图
        scene.fitBounds(movedBounds, { animate: false, padding });
      }
    },
    [padding],
  );

  // 主地图 和 鹰眼地图的同步
  React.useEffect(() => {
    if (!mainScene || !eagleScene) return;
    const destroy = syncScene([mainScene, eagleScene], { mainIndex: 0, zoomGap: 0 }, handler);
    return destroy;
  }, [mainScene, eagleScene, handler]);
}

export const useDraggable = (eagleScene: Scene, elementRef: React.MutableRefObject<HTMLElement | null>) => {
  // 开始拖拽的位置
  const startPositionRef = React.useRef<Position>({ x: 0, y: 0 });
  const positionRef = React.useRef<Position>({ x: 0, y: 0 });
  // 是否拖拽过
  const [paned, setPaned] = React.useState<boolean>(false);

  React.useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const handleDragStart = (event: MouseEvent) => {
      positionRef.current = { x: 0, y: 0 };
      startPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };
    const handleDragEnd = (event: MouseEvent) => {
      setPaned(false);
      positionRef.current = {
        x: event.clientX - startPositionRef.current.x,
        y: event.clientY - startPositionRef.current.y,
      };
      console.log(positionRef.current);
      startPositionRef.current = {
        x: 0,
        y: 0,
      };
      //  重新计算 boxRect
    };

    element.addEventListener('dragstart', handleDragStart);
    document.body.addEventListener('dragend', handleDragEnd);

    return () => {
      element.removeEventListener('dragstart', handleDragStart);
      document.body.removeEventListener('dragend', handleDragEnd);
    };
  }, [elementRef]);

  React.useEffect(() => {
    if (eagleScene && positionRef.current && !paned) {
      eagleScene.panBy(positionRef.current.x, positionRef.current.y);
      setPaned(true);
    }
  }, [paned]);
};

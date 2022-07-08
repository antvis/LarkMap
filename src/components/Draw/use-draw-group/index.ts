import type { BaseMode } from '@antv/l7-draw';
import { useCallback, useMemo } from 'react';
import { toPairs, fromPairs } from 'lodash-es';
import { useDraw } from '../use-draw';
import type { DrawType } from '../types';
import type { CommonDrawOptions, DrawGroupData, UseDrawGroupConfig } from './types';

export const useDrawGroup = (
  {
    point: pointConfig,
    line: lineConfig,
    polygon: polygonConfig,
    rect: rectConfig,
    circle: circleConfig,
  }: UseDrawGroupConfig,
  commonOptions?: CommonDrawOptions,
) => {
  const hasPointConfig = !!pointConfig;
  const hasLineConfig = !!lineConfig;
  const hasPolygonConfig = !!polygonConfig;
  const hasRectConfig = !!rectConfig;
  const hasCircleConfig = !!circleConfig;

  const getDrawOptions = useCallback(
    (options: any) => {
      return {
        ...commonOptions,
        ...(options instanceof Object ? options : {}),
      };
    },
    [commonOptions],
  );

  const pointDrawHook = useDraw({
    type: 'point',
    options: getDrawOptions(pointConfig),
  });
  const lineDrawHook = useDraw({
    type: 'line',
    options: getDrawOptions(lineConfig),
  });
  const polygonDrawHook = useDraw({
    type: 'polygon',
    options: getDrawOptions(polygonConfig),
  });
  const rectDrawHook = useDraw({
    type: 'rect',
    options: getDrawOptions(rectConfig),
  });
  const circleDrawHook = useDraw({
    type: 'circle',
    options: getDrawOptions(circleConfig),
  });

  const drawInfoMap: Partial<Record<DrawType, ReturnType<typeof useDraw>>> = useMemo(() => {
    return fromPairs(
      toPairs({
        point: hasPointConfig ? pointDrawHook : undefined,
        line: hasLineConfig ? lineDrawHook : undefined,
        polygon: hasPolygonConfig ? polygonDrawHook : undefined,
        rect: hasRectConfig ? rectDrawHook : undefined,
        circle: hasCircleConfig ? circleDrawHook : undefined,
      }).filter(([, hook]) => !!hook),
    );
  }, [
    pointDrawHook,
    lineDrawHook,
    polygonDrawHook,
    rectDrawHook,
    circleDrawHook,
    hasPointConfig,
    hasLineConfig,
    hasPolygonConfig,
    hasRectConfig,
    hasCircleConfig,
  ]);

  const drawMap = useMemo(() => {
    return fromPairs(toPairs(drawInfoMap).map(([type, hook]) => [type, hook.draw]));
  }, [drawInfoMap]);

  const drawGroupData = useMemo(() => {
    return fromPairs(toPairs(drawInfoMap).map(([type, hook]) => [type, hook.drawData]));
  }, [drawInfoMap]);

  const setDrawGroupData = useCallback(
    (newData: Partial<DrawGroupData>) => {
      Object.entries(newData).forEach(([type, newDrawData]) => {
        drawInfoMap[type]?.setDrawData(newDrawData);
      });
    },
    [drawInfoMap],
  );

  const activeDraw = useMemo(() => {
    return (
      Object.values(drawInfoMap).find((hook) => {
        return hook.isEnable;
      })?.draw ?? null
    );
  }, [drawInfoMap]);

  const setActiveDraw = useCallback(
    (target: BaseMode | DrawType | null) => {
      Object.values(drawInfoMap).forEach((hook) => {
        if (!hook) {
          return;
        }
        const targetDraw = typeof target === 'string' ? drawInfoMap[target]?.draw ?? null : target;
        if (!targetDraw) {
          hook.disable();
          return;
        }
        const enabled = hook.isEnable;
        if (targetDraw === hook.draw) {
          if (!enabled) {
            hook.enable();
          }
        } else if (enabled) {
          hook.disable();
        }
      });
    },
    [drawInfoMap],
  );

  return {
    drawMap,
    drawGroupData,
    setDrawGroupData,
    activeDraw,
    setActiveDraw,
  };
};

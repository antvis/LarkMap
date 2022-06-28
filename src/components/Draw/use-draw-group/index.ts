import { useCallback, useMemo } from 'react';
import type { BaseMode } from '@antv/l7-draw';
import { useDraw } from '../use-draw';
import type { UseDrawGroupParams } from './types';

const getDrawOptions = (options: any) => (options instanceof Object ? options : {});

export const useDrawGroup = ({
  point: pointConfig,
  line: lineConfig,
  polygon: polygonConfig,
  rect: rectConfig,
  circle: circleConfig,
}: UseDrawGroupParams) => {
  const {
    draw: pointDraw,
    drawData: pointDrawData,
    isEnable: isPointEnable,
  } = useDraw({
    type: 'point',
    options: getDrawOptions(pointConfig),
  });
  const {
    draw: lineDraw,
    drawData: lineDrawData,
    isEnable: isLineEnable,
  } = useDraw({
    type: 'line',
    options: getDrawOptions(lineConfig),
  });
  const {
    draw: polygonDraw,
    drawData: polygonDrawData,
    isEnable: isPolygonEnable,
  } = useDraw({
    type: 'polygon',
    options: getDrawOptions(polygonConfig),
  });
  const {
    draw: rectDraw,
    drawData: rectDrawData,
    isEnable: isRectEnable,
  } = useDraw({
    type: 'rect',
    options: getDrawOptions(rectConfig),
  });
  const {
    draw: circleDraw,
    drawData: circleDrawData,
    isEnable: isCircleEnable,
  } = useDraw({
    type: 'circle',
    options: getDrawOptions(circleConfig),
  });

  const drawMap = useMemo(() => {
    return {
      point: pointDraw,
      line: lineDraw,
      polygon: polygonDraw,
      rect: rectDraw,
      circle: circleDraw,
    };
  }, [circleDraw, lineDraw, pointDraw, polygonDraw, rectDraw]);

  const drawGroupData = useMemo(() => {
    return {
      point: pointDrawData,
      line: lineDrawData,
      polygon: polygonDrawData,
      rect: rectDrawData,
      circle: circleDrawData,
    };
  }, [circleDrawData, lineDrawData, pointDrawData, polygonDrawData, rectDrawData]);

  const activeDraw = useMemo(() => {
    if (isPointEnable) {
      return pointDraw;
    }
    if (isLineEnable) {
      return lineDraw;
    }
    if (isPolygonEnable) {
      return polygonDraw;
    }
    if (isRectEnable) {
      return rectDraw;
    }
    if (isCircleEnable) {
      return circleDraw;
    }
    return null;
  }, [
    circleDraw,
    isCircleEnable,
    isLineEnable,
    isPointEnable,
    isPolygonEnable,
    isRectEnable,
    lineDraw,
    pointDraw,
    polygonDraw,
    rectDraw,
  ]);

  const setActiveDraw = useCallback(
    (targetDraw: BaseMode) => {
      Object.values(drawMap).forEach((draw) => {
        if (targetDraw === draw) {
          if (draw.getIsEnable()) {
            draw.disable();
          }
        } else {
          if (!draw.getIsEnable()) {
            draw.enable();
          }
        }
      });
    },
    [drawMap],
  );

  return {
    drawMap,
    drawGroupData,
    activeDraw,
    setActiveDraw,
  };
};

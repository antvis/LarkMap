import { DrawType } from '@antv/l7-draw/es/control/types';
import type {DrawGroupData} from '@antv/larkmap'
import type { Feature, Polygon } from 'geojson';

export const CLS_PREFIX = 'larkmap-draw-modal';

export const DRAW_ICON_TYPE_MAP: Record<DrawType, string> = {
  point: 'l7draw-point',
  line: 'l7draw-line',
  polygon: 'l7draw-polygon',
  rect: 'l7draw-rect',
  circle: 'l7draw-circle',
};

export const DRAW_TEXT_TYPE_MAP: Record<DrawType, string> = {
  point: '绘制点',
  line: '绘制线',
  polygon: '绘制面',
  rect: '绘制矩形',
  circle: '绘制圆',
};

export const DEFAULT_DRAW_DATA: DrawGroupData = {
  circle: [],
  line: [],
  point: [],
  polygon: [],
  rect: [],
};


export const DEFAULT_POLYGON_FEATURE: Feature<Polygon> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [120.138761, 30.25156],
        [120.140241, 30.251803],
        [120.141412, 30.252336],
        [120.140802, 30.253083],
        [120.14229, 30.253511],
        [120.144149, 30.253709],
        [120.144584, 30.253561],
        [120.145593, 30.252685],
        [120.146464, 30.252505],
        [120.145852, 30.251835],
        [120.144858, 30.250632],
        [120.144546, 30.250363],
        [120.144338, 30.25039],
        [120.141746, 30.249919],
        [120.14128, 30.249983],
        [120.139795, 30.249946],
        [120.139311, 30.250069],
        [120.138722, 30.25033],
        [120.138761, 30.25156],
      ],
    ],
  },
};

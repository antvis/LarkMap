import type {
  PartialDrawCircleOptions,
  PartialDrawLineOptions,
  PartialDrawPointOptions,
  PartialDrawPolygonOptions,
  PartialDrawRectOptions,
} from '../types';

export type UseDrawParams =
  | {
      type: 'point';
      options: PartialDrawPointOptions;
    }
  | {
      type: 'line';
      options: PartialDrawLineOptions;
    }
  | {
      type: 'polygon';
      options: PartialDrawPolygonOptions;
    }
  | {
      type: 'rect';
      options: PartialDrawRectOptions;
    }
  | {
      type: 'circle';
      options: PartialDrawCircleOptions;
    };

import type {
  PartialDrawCircleOptions,
  PartialDrawLineOptions,
  PartialDrawPointOptions,
  PartialDrawPolygonOptions,
  PartialDrawRectOptions,
} from '../types';

export type UseDrawGroupParams = {
  point?: PartialDrawPointOptions | boolean;
  line?: PartialDrawLineOptions | boolean;
  polygon?: PartialDrawPolygonOptions | boolean;
  rect?: PartialDrawRectOptions | boolean;
  circle?: PartialDrawCircleOptions | boolean;
};

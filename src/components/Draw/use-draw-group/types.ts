import type { DeepPartial, IBaseModeOptions } from '@antv/l7-draw';
import type { Feature, LineString, Point, Polygon } from 'geojson';
import type {
  PartialDrawCircleOptions,
  PartialDrawLineOptions,
  PartialDrawPointOptions,
  PartialDrawPolygonOptions,
  PartialDrawRectOptions,
} from '../types';

export type UseDrawGroupConfig = {
  point?: PartialDrawPointOptions | boolean;
  line?: PartialDrawLineOptions | boolean;
  polygon?: PartialDrawPolygonOptions | boolean;
  rect?: PartialDrawRectOptions | boolean;
  circle?: PartialDrawCircleOptions | boolean;
};

export type CommonDrawOptions = DeepPartial<IBaseModeOptions>;

export type DrawGroupData = {
  point: Feature<Point>[];
  line: Feature<LineString>[];
  polygon: Feature<Polygon>[];
  rect: Feature<Polygon>[];
  circle: Feature<Polygon>[];
};

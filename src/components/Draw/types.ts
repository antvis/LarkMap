import type {
  DeepPartial,
  ICircleDrawerOptions,
  ILineDrawerOptions,
  IPointDrawerOptions,
  IPolygonDrawerOptions,
  IRectDrawerOptions,
} from '@antv/l7-draw';
import type { Feature, LineString, Point, Polygon } from 'geojson';

export type FeatureData = Feature<Point> | Feature<LineString> | Feature<Polygon>;
export type DrawData = FeatureData[];

export type PartialDrawPointOptions = DeepPartial<IPointDrawerOptions>;
export type PartialDrawLineOptions = DeepPartial<ILineDrawerOptions>;
export type PartialDrawPolygonOptions = DeepPartial<IPolygonDrawerOptions>;
export type PartialDrawRectOptions = DeepPartial<IRectDrawerOptions>;
export type PartialDrawCircleOptions = DeepPartial<ICircleDrawerOptions>;

export type DrawType = 'point' | 'line' | 'polygon' | 'rect' | 'circle';

// organize-imports-ignore

export { CustomControl } from './CustomControl';
export type { CustomControlProps } from './CustomControl/types';

export { ExportImageControl } from './ExportImageControl';
export type { ExportImageControlProps } from './ExportImageControl/types';

export { FullscreenControl } from './FullscreenControl';
export type { FullscreenControlProps } from './FullscreenControl/type';

export { GeoLocateControl } from './GeoLocateControl';
export type { GeoLocateControlProps } from './GeoLocateControl/type';

export { LayerSwitchControl } from './LayerSwitchControl';
export type { LayerSwitchControlProps } from './LayerSwitchControl/types';

export { MapThemeControl } from './MapThemeControl';
export type { MapThemeControlProps } from './MapThemeControl/types';

export { MouseLocationControl } from './MouseLocationControl';
export type { MouseLocationControlProps } from './MouseLocationControl/types';

// 兼容修改组件名称，带布局属性的组件加 Control 后缀，正式 v1 后不再兼容
export { ScaleControl as Scale, ScaleControl } from './ScaleControl';
export type { ScaleControlProps, ScaleControlProps as ScaleProps } from './ScaleControl/type';

export { ZoomControl as Zoom, ZoomControl } from './ZoomControl';
export type { ZoomControlProps, ZoomControlProps as ZoomProps } from './ZoomControl/types';

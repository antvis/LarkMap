// organize-imports-ignore
/**
 * 容器组件
 */
export { LarkMap } from './components/LarkMap';
export type { LarkMapProps } from './components/LarkMap/types';
export * from './components/LarkMap/hooks';

/**
 * 图层组件
 */
export * from './components/Layers';

/**
 * 控件组件
 * */
export { CustomControl } from './components/Control/CustomControl';
export { CustomControlProps } from './components/Control/CustomControl/types';
// 兼容修改组件名称，带布局属性的组件加 Control 后缀
export { ScaleControl, ScaleControl as Scale } from './components/Control/ScaleControl';
export { ScaleControlProps, ScaleControlProps as ScaleProps } from './components/Control/ScaleControl/type';
export { ZoomControl, ZoomControl as Zoom } from './components/Control/ZoomControl';
export { ZoomControlProps, ZoomControlProps as ZoomProps } from './components/Control/ZoomControl/types';
export { FullscreenControl, FullscreenControl as Fullscreen } from './components/Control/FullscreenControl';
export {
  FullscreenControlProps,
  FullscreenControlProps as FullscreenProps,
} from './components/Control/FullscreenControl/type';
export { GeoLocateControl, GeoLocateControl as GeoLocate } from './components/Control/GeoLocateControl';
export { GeoLocateControlProps as GeoLocateProps } from './components/Control/GeoLocateControl/type';
export { ExportImageControl, ExportImageControl as ExportImage } from './components/Control/ExportImageControl';
export {
  ExportImageControlProps,
  ExportImageControlProps as ExportImageProps,
} from './components/Control/ExportImageControl/types';
export { MouseLocationControl, MouseLocationControl as MouseLocation } from './components/Control/MouseLocationControl';
export {
  MouseLocationControlProps,
  MouseLocationControlProps as MouseLocationProps,
} from './components/Control/MouseLocationControl/types';
export { LayerSwitchControl, LayerSwitchControl as LayerSwitch } from './components/Control/LayerSwitchControl';
export {
  LayerSwitchControlProps,
  LayerSwitchControlProps as LayerSwitchProps,
} from './components/Control/LayerSwitchControl/types';
export { MapThemeControl, MapThemeControl as MapTheme } from './components/Control/MapThemeControl';
export {
  MapThemeControlProps,
  MapThemeControlProps as MapThemeProps,
} from './components/Control/MapThemeControl/types';

export { ContextMenu } from './components/ContextMenu';
export { ContextMenuItemProps, ContextMenuProps } from './components/ContextMenu/types';
export { LocationSearch } from './components/LocationSearch';
export {
  LocationSearchProps,
  LocationSearchOption,
  GaodeLocationSearchParams,
} from './components/LocationSearch/types';
export * from './components/Control';

/**
 * 分析组件
 */
export { Template } from './components/Template';
export type { TemplateProps } from './components/Template/types';
export { Marker } from './components/Marker';
export type { MarkerProps } from './components/Marker/types';
export { Popup } from './components/Popup';
export { PopupProps } from './components/Popup/types';
export { LayerPopup } from './components/LayerPopup';
export { LayerPopupProps } from './components/LayerPopup/types';

/**
 * 图例组件
 */
export { LegendIcon } from './components/Legend/LegendIcon';
export type { LegendIconProps } from './components/Legend/LegendIcon/types';
export { LegendProportion } from './components/Legend/LegendProportion';
export type { LegendProportionProp } from './components/Legend/LegendProportion/types';
export { LegendCategories } from './components/Legend/LegendCategories';
export type { LegendCategoriesProps } from './components/Legend/LegendCategories/types';
export { LegendRamp } from './components/Legend/LegendRamp';
export type { LegendRampProps } from './components/Legend/LegendRamp/types';

/**
 * 绘制组件
 */
export { useDraw } from './components/Draw/use-draw';
export { useDrawGroup } from './components/Draw/use-draw-group';
// export { DrawControl } from './components/Draw/DrawControl';
// export type { DrawControlProps } from './components/Draw/DrawControl/types';

/**
 * 属性组件
 */
export * from './components/LayerAttribute';

/**
 * 版本号
 */
export { default as version } from './version';

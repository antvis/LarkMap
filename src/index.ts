// organize-imports-ignore
/**
 * 容器组件
 * */
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
export { CustomControl } from './components/CustomControl';
export type { CustomControlProps } from './components/CustomControl/types';
// 兼容修改组件名称，带布局属性的组件加 Control 后缀
export { ScaleControl, ScaleControl as Scale } from './components/ScaleControl';
export type { ScaleControlProps, ScaleControlProps as ScaleProps } from './components/ScaleControl/types';
export { ZoomControl, ZoomControl as Zoom } from './components/ZoomControl';
export type { ZoomControlProps, ZoomControlProps as ZoomProps } from './components/ZoomControl/types';
export { ContextMenu } from './components/ContextMenu';
export type { ContextMenuItemProps, ContextMenuProps } from './components/ContextMenu/types';
export { LocationSearch } from './components/LocationSearch';
export type {
  LocationSearchProps,
  LocationSearchOption,
  GaodeLocationSearchParams,
} from './components/LocationSearch/types';

/**
 * 分析组件
 * */
export { Template } from './components/Template';
export type { TemplateProps } from './components/Template/types';
export { Marker } from './components/Marker';
export type { MarkerProps } from './components/Marker/types';
export { Popup } from './components/Popup';
export type { PopupProps } from './components/Popup/types';

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
 * */
export { default as version } from './version';

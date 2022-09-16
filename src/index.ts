// organize-imports-ignore
/**
 * 容器组件
 * */
export { LarkMap } from './components/LarkMap';
export { LarkMapProps } from './components/LarkMap/types';
export * from './components/LarkMap/hooks';

/**
 * 图层组件
 */
export * from './components/Layers';

/**
 * 控件组件
 * */
export { CustomControl } from './components/CustomControl';
export { CustomControlProps } from './components/CustomControl/types';
// 兼容修改组件名称，带布局属性的组件加 Control 后缀
export { ScaleControl, ScaleControl as Scale } from './components/ScaleControl';
export { ScaleControlProps, ScaleControlProps as ScaleProps } from './components/ScaleControl/types';
export { ZoomControl, ZoomControl as Zoom } from './components/ZoomControl';
export { ZoomControlProps, ZoomControlProps as ZoomProps } from './components/ZoomControl/types';
export { ContextMenu } from './components/ContextMenu/index';
export { LocationSearch } from './components/LocationSearch';
export {
  LocationSearchProps,
  LocationSearchOption,
  GaodeLocationSearchParams,
} from './components/LocationSearch/types';
/**
 * 分析组件
 * */
export { Template } from './components/Template';
export { TemplateProps } from './components/Template/types';
export { Marker } from './components/Marker';
export { MarkerProps } from './components/Marker/types';
export { Popup } from './components/Popup';
export { PopupProps } from './components/Popup/types';

/**
 * 绘制组件
 */
export { useDraw } from './components/Draw/use-draw';
export { useDrawGroup } from './components/Draw/use-draw-group';
// export { DrawControl } from './components/Draw/DrawControl';
// export { DrawControlProps } from './components/Draw/DrawControl/types';

/**
 * 属性组件
 */
export * from './components/LayerAttribute';

/**
 * 版本号
 * */
export { default as version } from './version';

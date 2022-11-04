import type { HeatmapLayerStyleAttributeValue } from './types';
/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const heatmapLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: HeatmapLayerStyleAttributeValue = {
    size: style?.sizeField ? { field: style.sizeField, value: [0, 1] } : undefined,
    style: {
      intensity: style.intensity,
      radius: style.radius,
      opacity: style.opacity,
      rampColors: {
        colors: style.colors,
        positions: style.colors.map((_, index) => index / (style.colors.length - 1)),
      },
    },
    minZoom: style.zoom?.[0],
    maxZoom: style.zoom?.[1],
    blend: style.blend,
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const heatmapLayerStyleConfigToFlat = (styleConfig: HeatmapLayerStyleAttributeValue) => {
  const { size, style, minZoom, maxZoom, blend } = styleConfig;
  const config = {
    // @ts-ignore
    colors: style?.rampColors?.colors,
    opacity: style?.opacity,
    // @ts-ignore
    radius: style?.radius,
    // @ts-ignore
    sizeField: size?.field,
    // @ts-ignore
    intensity: style?.intensity,
    zoom: minZoom & maxZoom ? [minZoom, maxZoom] : [0, 23],
    blend,
  };

  return config;
};

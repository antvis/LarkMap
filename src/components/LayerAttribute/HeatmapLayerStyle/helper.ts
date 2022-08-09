import type { HeatmapLayerStyleAttributeValue } from './types';
/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const heatmapLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const { heatmap, shape } = style;
  const styleConfig: HeatmapLayerStyleAttributeValue = {
    color: style.colorField
      ? {
          field: style.colorField,
          value: style.colorRibbon,
          scale: { type: style.colorType },
        }
      : style.color,
    size: style.sizeField
      ? {
          field: style.sizeField,
          value: style.sizeRange,
          scale: { type: style.sizeType },
        }
      : style.size,
    style: {
      intensity: style.intensity,
      radius: style.radius,
      opacity: style.opacity,
      coverage: style.coverage,
      angle: style.angle,
      rampColors: {
        colors: style.colors,
        positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
    shape: shape ? shape : heatmap,
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const heatmapLayerStyleConfigToFlat = (styleConfig: HeatmapLayerStyleAttributeValue) => {
  const { color, size, shape, style } = styleConfig;

  let heatmap = undefined;
  let shapeValue = undefined;
  if (['heatmap', 'heatmap3D'].includes(shape)) {
    heatmap = shape;
  } else if (['circle', 'triangle', 'square', 'hexagon'].includes(shape)) {
    heatmap = 'heatmap';
    shapeValue = shape;
  } else if (['cylinder', 'triangleColumn', 'squareColumn', 'hexagonColumn'].includes(shape)) {
    heatmap = 'heatmap3D';
    shapeValue = shape;
  }

  const config = {
    colorField: typeof color === 'object' ? color?.field : undefined,
    colorRibbon: typeof color === 'object' ? color?.value : undefined,
    color: typeof color !== 'object' ? color : undefined,

    size: typeof size !== 'object' ? size : undefined,
    // @ts-ignore
    sizeField: typeof size === 'object' ? size?.field : undefined,
    // @ts-ignore
    sizeRange: typeof size === 'object' ? size?.value : undefined,
    // @ts-ignore
    sizeType: typeof size === 'object' ? size?.scale.type : undefined,

    heatmap,

    shape: shapeValue,
    // @ts-ignore
    intensity: style.intensity,
    // @ts-ignore
    radius: style.radius,
    opacity: style.opacity,
    // @ts-ignore
    coverage: style.coverage,
    angle: style.angle,
    // @ts-ignore
    colors: style?.rampColors?.colors,
  };

  return config;
};

export const HEATMAP_SHAPE_TYPE = {
  heatmap: [
    { value: 'circle', label: '圆形' },
    { value: 'triangle', label: '三角形' },
    { value: 'square', label: '正方形' },
    { value: 'hexagon', label: '六边形' },
  ],
  heatmap3D: [
    { value: 'cylinder', label: '圆柱' },
    { value: 'triangleColumn', label: '三角形柱' },
    { value: 'squareColumn', label: '方柱' },
    { value: 'hexagonColumn', label: '六边形柱' },
  ],
};

export const HEATMAP_SHAPE = {
  heatmap: { value: 'heatmap', label: '2D' },
  heatmap3D: { value: 'heatmap3D', label: '3D' },
  hexagon: { value: 'hexagon', label: '蜂窝' },
  hexagonColumn: { value: 'hexagonColumn', label: '蜂窝柱' },
};

export const HEATMAP_SHAPE_LIST = Object.values(HEATMAP_SHAPE);

import type { BubbleLayerStyle } from './types';

export const bubbleLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: BubbleLayerStyle = {
    fillColor: style.fillColorField
      ? {
          field: style.fillColorField,
          value: style.fillColorRibbon,
        }
      : style.fillColor,
    opacity: style.fillColorOpacity,
    strokeColor: style.strokeColor,
    lineWidth: style.lineWidth,
    lineOpacity: style.lineOpacity,
    radius: style.radiusField
      ? {
          field: style.radiusField,
          value: style.radiusRange,
        }
      : style.radius,
    label: {
      field: style.labelField,
      visible: Boolean(style.labelField),
      style: {
        fill: style.labelColor,
        fontSize: style.labelFontSize,
        textAnchor: style.labelTextAnchor,
      },
    },
  };

  return styleConfig;
};

export const bubbleLayerStyleConfigToFlat = (styleConfig: BubbleLayerStyle) => {
  const { fillColor, opacity, strokeColor, lineWidth, lineOpacity, radius, label } = styleConfig;
  const config = {
    fillColorField: typeof fillColor === 'object' ? fillColor?.field : undefined,
    fillColorRibbon: typeof fillColor === 'object' ? fillColor?.value : undefined,
    fillColor: typeof fillColor !== 'object' ? fillColor : undefined,
    fillColorOpacity: opacity,
    strokeColor: strokeColor,
    lineWidth,
    lineOpacity,
    radius: typeof radius !== 'object' ? radius : undefined,
    // @ts-ignore
    radiusField: typeof radius === 'object' ? radius?.field : undefined,
    // @ts-ignore
    radiusRange: typeof radius === 'object' ? radius?.value : undefined,
    labelField: label?.field,
    labelColor: label?.style?.fill,
    labelFontSize: label?.style?.fontSize,
    labelTextAnchor: label?.style?.textAnchor,
  };

  return config;
};

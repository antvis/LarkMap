export const bubbleStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig = {
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
      field: style.groupLabel,
      visible: Boolean(style.groupLabel),
      style: {
        fill: style.labelColor,
        fontSize: style.labelFontSize,
        textAnchor: style.labelTextAnchor,
      },
    },
  };

  return styleConfig;
};

export const bubbleStyleConfigToFlat = (styleConfig: Record<string, any>) => {
  const { fillColor, opacity, strokeColor, lineWidth, lineOpacity, radius, label } = styleConfig;
  const config = {
    fillColorField: fillColor?.field,
    fillColorRibbon: fillColor?.value,
    fillColor: typeof fillColor !== 'object' ? fillColor : undefined,
    fillColorOpacity: opacity,
    strokeColor: strokeColor,
    lineWidth,
    lineOpacity,
    radius: typeof radius !== 'object' ? radius : undefined,
    radiusField: radius?.field,
    radiusRange: radius?.value,
    labelColor: label?.style?.fill,
    labelFontSize: label?.style?.fontSize,
    labelTextAnchor: label?.style?.textAnchor,
  };

  return config;
};

import { HeatmapLayer as L7HeatmapLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { HeatmapLayerProps } from './types';

export const HeatmapLayer = memo(
  forwardRef<L7HeatmapLayer, HeatmapLayerProps>(function HeatmapLayer(props, ref) {
    const layerRef = useCreateLayer<L7HeatmapLayer, HeatmapLayerProps>(L7HeatmapLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

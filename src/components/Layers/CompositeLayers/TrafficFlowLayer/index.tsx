import { TrafficFlowLayer as L7TrafficFlowLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import { LayerEventMap } from '../../hooks/use-layer-event/constant';
import type { TrafficFlowLayerProps } from './types';

const TrafficFlowLayerEventMap = Object.assign(LayerEventMap, {});

export const TrafficFlowLayer = memo(
  forwardRef<L7TrafficFlowLayer, TrafficFlowLayerProps>(function TrafficFlowLayer(props, ref) {
    const layerRef = useCreateLayer<L7TrafficFlowLayer, TrafficFlowLayerProps>(L7TrafficFlowLayer, props);

    useLayerEvent(layerRef.current, props, TrafficFlowLayerEventMap);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

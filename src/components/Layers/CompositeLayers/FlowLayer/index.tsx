import { FlowLayer as L7FlowLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { FlowLayerProps } from './types';

export const FlowLayer = memo(
  forwardRef<L7FlowLayer, FlowLayerProps>(function TrafficFlowLayer(props, ref) {
    const layerRef = useCreateLayer<L7FlowLayer, FlowLayerProps>(L7FlowLayer, props);
    //@ts-ignore
    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

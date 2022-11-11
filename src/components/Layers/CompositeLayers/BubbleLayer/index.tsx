import { BubbleLayer as L7BubbleLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { LayerEventMap } from '../../hooks/use-layer-event/constant';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { BubbleLayerProps } from './types';

const BubbleLayerEventMap = Object.assign(LayerEventMap, { onSelect: 'select', onUnselect: 'unselect' });

export const BubbleLayer = memo(
  forwardRef<L7BubbleLayer, BubbleLayerProps>(function BubbleLayer(props, ref) {
    const layerRef = useCreateLayer<L7BubbleLayer, BubbleLayerProps>(L7BubbleLayer, props);

    useLayerEvent(layerRef.current, props, BubbleLayerEventMap);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

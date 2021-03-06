import { BubbleLayer as L7BubbleLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer } from '../hooks/use-create-layer';
import type { BubbleLayerProps } from './types';

export const BubbleLayer = memo(
  forwardRef<L7BubbleLayer, BubbleLayerProps>((props, ref) => {
    const layerRef = useCreateLayer<L7BubbleLayer, BubbleLayerProps>(L7BubbleLayer, props);

    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

import { TextLayer as L7TextLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { TextLayerProps } from './types';

export const TextLayer = memo(
  forwardRef<L7TextLayer, TextLayerProps>(function TextLayer(props, ref) {
    const layerRef = useCreateLayer<L7TextLayer, TextLayerProps>(L7TextLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

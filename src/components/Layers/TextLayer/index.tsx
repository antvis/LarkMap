import { TextLayer as L7TextLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer } from '../hooks/use-create-layer';
import type { TextLayerProps } from './types';

export type { TextLayerProps };

export const TextLayer = memo(
  forwardRef<L7TextLayer, TextLayerProps>((props, ref) => {
    const layerRef = useCreateLayer<L7TextLayer, TextLayerProps>(L7TextLayer, props);

    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

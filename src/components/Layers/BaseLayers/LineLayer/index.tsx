import { LineLayer as L7LineLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer } from '../../hooks/use-create-layer';
import type { LineLayerProps } from './types';

export const LineLayer = memo(
  forwardRef<L7LineLayer, LineLayerProps>(function LineLayer(props, ref) {
    const layerRef = useCreateLayer<L7LineLayer, LineLayerProps>(L7LineLayer, props);

    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

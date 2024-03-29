import { LineLayer as L7LineLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { LineLayerProps } from './types';

export const LineLayer = memo(
  forwardRef<L7LineLayer, LineLayerProps>(function LineLayer(props, ref) {
    const layerRef = useCreateLayer<L7LineLayer, LineLayerProps>(L7LineLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

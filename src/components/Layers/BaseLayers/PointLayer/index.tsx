import { PointLayer as L7PointLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { PointLayerProps } from './types';

export const PointLayer = memo(
  forwardRef<L7PointLayer, PointLayerProps>(function PointLayer(props, ref) {
    const layerRef = useCreateLayer<L7PointLayer, PointLayerProps>(L7PointLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

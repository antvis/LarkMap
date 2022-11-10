import { PolygonLayer as L7PolygonLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { PolygonLayerProps } from './types';

export const PolygonLayer = memo(
  forwardRef<L7PolygonLayer, PolygonLayerProps>(function PolygonLayer(props, ref) {
    const layerRef = useCreateLayer<L7PolygonLayer, PolygonLayerProps>(L7PolygonLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

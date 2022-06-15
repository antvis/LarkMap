import { PolygonLayer as L7PolygonLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer } from '../hooks/use-create-layer';
import type { PolygonLayerProps } from './types';

export type { PolygonLayerProps };

export const PolygonLayer = memo(
  forwardRef<L7PolygonLayer, PolygonLayerProps>((props, ref) => {
    const layerRef = useCreateLayer<L7PolygonLayer, PolygonLayerProps>(L7PolygonLayer, props);

    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

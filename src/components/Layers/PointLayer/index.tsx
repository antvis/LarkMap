import { PointLayer as L7PointLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer } from '../hooks/use-create-layer';
import type { PointLayerProps } from './types';

export type { PointLayerProps };

export const PointLayer = memo(
  forwardRef<L7PointLayer, PointLayerProps>((props, ref) => {
    const layerRef = useCreateLayer<L7PointLayer, PointLayerProps>(L7PointLayer, props);

    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

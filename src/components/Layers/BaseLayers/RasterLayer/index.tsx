import { RasterLayer as L7RasterLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { RasterLayerProps } from './types';

export const RasterLayer = memo(
  forwardRef<L7RasterLayer, RasterLayerProps>(function PointLayer(props, ref) {
    const layerRef = useCreateLayer<L7RasterLayer, RasterLayerProps>(L7RasterLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

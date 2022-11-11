import { ImageLayer as L7ImageLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { ImageLayerProps } from './types';

export const ImageLayer = memo(
  forwardRef<L7ImageLayer, ImageLayerProps>(function ImageLayer(props, ref) {
    const layerRef = useCreateLayer<L7ImageLayer, ImageLayerProps>(L7ImageLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

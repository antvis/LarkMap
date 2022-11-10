import { IconFontLayer as L7IconFontLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { IconFontLayerProps } from './types';

export const IconFontLayer = memo(
  forwardRef<L7IconFontLayer, IconFontLayerProps>(function IconFontLayer(props, ref) {
    const layerRef = useCreateLayer<L7IconFontLayer, IconFontLayerProps>(L7IconFontLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

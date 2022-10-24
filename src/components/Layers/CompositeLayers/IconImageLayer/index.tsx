import { IconImageLayer as L7IconImageLayer } from '@antv/l7-composite-layers';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useCreateLayer, useLayerEvent } from '../../hooks';
import type { IconImageLayerProps } from './types';

export const IconImageLayer = memo(
  forwardRef<L7IconImageLayer, IconImageLayerProps>(function IconImageLayer(props, ref) {
    const layerRef = useCreateLayer<L7IconImageLayer, IconImageLayerProps>(L7IconImageLayer, props);

    useLayerEvent(layerRef.current, props);
    useImperativeHandle(ref, () => layerRef.current);

    return null;
  }),
);

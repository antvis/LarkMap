import { Marker as L7Marker } from '@antv/l7';
import { useDeepCompareEffect } from 'ahooks';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScene } from '../LarkMap/hooks';
import type { MarkerProps } from './types';

export const Marker = memo<MarkerProps>((props): React.ReactPortal => {
  const scene = useScene();
  const thisRef = useRef({ props });
  thisRef.current.props = props;

  const marker = useMemo(() => {
    let hasChildren = false;
    React.Children.forEach(props.children, (el) => {
      if (el) {
        hasChildren = true;
      }
    });
    const options = {
      ...props,
      element: hasChildren ? document.createElement('div') : null,
    };
    // @ts-ignore
    const l7marker = new L7Marker(options);

    l7marker.on('click', (e: MouseEvent) => {
      thisRef.current.props.onClick?.(e);
    });

    return l7marker;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    marker.setLnglat(props.lngLat);
  }, [props.lngLat]);

  useEffect(() => {
    scene.addMarker(marker);
    return () => {
      marker.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-ignore
  return createPortal(props.children, marker.getElement());
});

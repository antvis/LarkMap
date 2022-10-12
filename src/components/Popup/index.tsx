import { Popup as L7Popup } from '@antv/l7';
import { useDeepCompareEffect } from 'ahooks';
import type React from 'react';
import { memo, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScene } from '../LarkMap/hooks';
import type { PopupProps } from './types';

export const Popup = memo<PopupProps>(function Popup(props): React.ReactPortal {
  const scene = useScene();
  const domRef = useRef(document.createElement('div'));

  const popup = useMemo(() => {
    const options = { ...props };
    const l7Popup = new L7Popup(options);
    return l7Popup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onOpen = () => {
      props.onOpen?.();
    };
    popup.on('open', onOpen);
    return () => {
      popup.off('open', onOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onOpen]);

  useEffect(() => {
    const onClose = () => {
      props.onClose?.();
    };
    popup.on('close', onClose);
    return () => {
      popup.off('close', onClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClose]);

  useDeepCompareEffect(() => {
    popup.setLnglat(props.lngLat);
  }, [props.lngLat]);

  useEffect(() => {
    popup.setHTML(domRef.current);
    scene.addPopup(popup);
    return () => {
      popup.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-ignore
  return createPortal(props.children, domRef.current);
});

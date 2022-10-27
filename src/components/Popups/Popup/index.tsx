import type { IPopupOption} from '@antv/l7';
import { Popup as L7Popup } from '@antv/l7';
import { useDeepCompareEffect, useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopupElement } from '../hooks/usePopupElement';
import { useScene } from '../../LarkMap/hooks';
import { usePopupsUpdate } from '../hooks/usePopupsUpdate';
import { usePopupEvent } from '../hooks/usePopupEvent';
import type { PopupProps } from './types';

export const Popup: React.FC<PopupProps> = ({
  lngLat,
  text,
  html,
  title,
  closeOnClick,
  closeOnEsc,
  maxWidth,
  anchor,
  offsets,
  autoPan,
  autoClose,
  followCursor,
  closeButton,
  closeButtonOffsets,
  stopPropagation,
  children,
  onOpen,
  onClose,
  onShow,
  onHide,
}) => {
  const scene = useScene();
  const [popup, setPopup] = useState<L7Popup | undefined>();
  const { portal: htmlPortal, dom: htmlDOM } = usePopupElement(html);
  const { portal: titlePortal, dom: titleDOM } = usePopupElement(title);
  const domRef = useRef(document.createElement('div'));

  const popupOptions: IPopupOption = useMemo(() => {
    return {
      lngLat,
      text,
      html: htmlDOM,
      title: titleDOM,
      closeOnClick,
      closeOnEsc,
      maxWidth,
      anchor,
      offsets,
      autoPan,
      autoClose,
      followCursor,
      closeButton,
      closeButtonOffsets,
      stopPropagation,
      children: domRef.current,
    };
  }, [
    lngLat,
    text,
    htmlDOM,
    titleDOM,
    domRef.current,
    closeOnClick,
    closeOnEsc,
    maxWidth,
    anchor,
    offsets,
    autoPan,
    autoClose,
    followCursor,
    closeButton,
    closeButtonOffsets,
    stopPropagation,
  ]);

  useMount(() => {
    const popups = new L7Popup(omitBy(popupOptions, (value) => value === undefined));
    console.log(popups, 'l7');
    setPopup(popups);
    setTimeout(() => {
      scene.addPopup(popups);
    }, 0);
  });

  console.log(popup?.getOptions(), 'set');

  usePopupsUpdate(popup, popupOptions);

  useUnmount(() => {
    scene.removePopup(popup);
    setPopup(popup);
  });

  usePopupEvent(popup, {
    open: onOpen,
    close: onClose,
    show: onShow,
    hide: onHide,
  });

  useDeepCompareEffect(() => {
    if (popup) {
      popup.setLnglat(lngLat);
    }
  }, [lngLat]);

  useEffect(() => {
    if (popup) {
      popup.setHTML(domRef.current);
      scene.addPopup(popup);
      return () => {
        popup.remove();
      };
    }
  }, []);

  return (
    <>
      {htmlPortal}
      {titlePortal}
      {createPortal(children, domRef.current)}
    </>
  );
};

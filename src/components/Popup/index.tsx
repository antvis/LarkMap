import type { IPopupOption } from '@antv/l7';
import { Popup as L7Popup } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../Control/hooks';
import { useScene } from '../LarkMap/hooks';
import type { PopupProps } from './types';

export const Popup: React.FC<PopupProps> = ({
  style,
  closeButton,
  closeButtonOffsets,
  closeOnClick,
  closeOnEsc,
  maxWidth,
  anchor,
  offsets,
  stopPropagation,
  autoPan,
  autoClose,
  followCursor,
  className,
  lngLat,
  children,
  title,
  onOpen,
  onClose,
  onShow,
  onHide,
}) => {
  const scene = useScene();
  const [popup, setPopup] = useState<L7Popup | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: childrenPartial, dom: childrenDOM } = useL7ComponentPortal(children);
  const { portal: titlePartial, dom: titleDOM } = useL7ComponentPortal(title);

  const popupOptions: Partial<IPopupOption> = useMemo(
    () => ({
      style: styleText,
      closeButton,
      closeButtonOffsets,
      closeOnClick,
      closeOnEsc,
      maxWidth,
      anchor,
      offsets,
      stopPropagation,
      autoPan,
      autoClose,
      followCursor,
      className,
      lngLat,
      html: childrenDOM,
      title: titleDOM,
    }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      styleText,
      closeButton,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(closeButtonOffsets),
      closeOnClick,
      closeOnEsc,
      maxWidth,
      anchor,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(offsets),
      stopPropagation,
      autoPan,
      autoClose,
      followCursor,
      className,
      childrenDOM,
      titleDOM,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lngLat),
    ],
  );

  useEffect(() => {
    const newPopup = new L7Popup(omitBy(popupOptions, (value) => value === undefined));
    setPopup(newPopup);
    scene.addPopup(newPopup);
    return () => {
      scene.removePopup(newPopup);
      setPopup(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useL7ComponentUpdate(popup, popupOptions);

  useL7ComponentEvent(popup, {
    open: onOpen,
    close: onClose,
    show: onShow,
    hide: onHide,
  });

  return (
    <>
      {childrenPartial}
      {titlePartial}
    </>
  );
};

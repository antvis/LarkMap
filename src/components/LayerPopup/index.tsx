import type { IPopupOption } from '@antv/l7';
import { LayerPopup as L7LayerPopup } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { getStyleText } from '../../utils';
import {
  useL7ComponentEvent,
  useL7ComponentPortal,
  useL7ComponentUpdate,
} from '../Control/hooks';
import { useScene } from '../LarkMap/hooks';
import type { LayerPopupProps } from './types';

export const LayerPopup: React.FC<LayerPopupProps> = ({
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
  className,
  lngLat,
  title,
  items,
  trigger,
  onOpen,
  onClose,
  onShow,
  onHide,
}) => {
  const scene = useScene();
  const [popup, setPopup] = useState<L7LayerPopup | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: titlePartial, dom: titleDOM } = useL7ComponentPortal(title);

  const layerPopupOptions: Partial<IPopupOption> = useMemo(
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
      followCursor: trigger === 'hover',
      className,
      lngLat,
      config: items,
      trigger,
      title: titleDOM,
      items,
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
      className,
      titleDOM,
      trigger,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lngLat),
      items,
    ],
  );

  useMount(() => {
    const newPopup = new L7LayerPopup(
      omitBy(layerPopupOptions, (value) => value === undefined),
    );
    setPopup(newPopup);
    setTimeout(() => {
      scene.addPopup(newPopup);
    }, 0);
  });

  useUnmount(() => {
    scene.removePopup(popup);
    setPopup(undefined);
  });

  useL7ComponentUpdate(popup, layerPopupOptions);

  useL7ComponentEvent(popup, {
    open: onOpen,
    close: onClose,
    show: onShow,
    hide: onHide,
  });

  return <>{titlePartial}</>;
};

import type { IPopupOption, LayerField } from '@antv/l7';
import { LayerPopup as L7LayerPopup } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../Control/hooks';
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
  followCursor,
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

  const config = useMemo(() => {
    const data = items.map((item) => {
      const fieldsData = item.fields.map((value: LayerField) => {
        return {
          ...value,
          formatField: typeof value.formatField === 'string' ? () => value.formatField : value.formatField,
          formatValue: typeof value.formatValue === 'string' ? () => value.formatValue : value.formatValue,
        };
      });
      return { layer: item.layer, fields: fieldsData };
    });
    return data;
  }, [items]);

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
      followCursor,
      className,
      lngLat,
      config,
      trigger,
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
      titleDOM,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(config),
      trigger,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lngLat),
    ],
  );

  useMount(() => {
    const newPopup = new L7LayerPopup(omitBy(layerPopupOptions, (value) => value === undefined));
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

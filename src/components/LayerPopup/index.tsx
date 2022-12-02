import type { IPopupOption, LayerField } from '@antv/l7';
import { LayerPopup as L7LayerPopup } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../Control/hooks';
import { useLayerManager, useScene } from '../LarkMap/hooks';
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
  const [portal, setPortal] = useState([]);
  const layerManager = useLayerManager();

  const newPortal = (data: any, dome: any) => {
    return {
      portal: data ? createPortal(data, dome) : null,
      dom: dome,
    };
  };

  const layerPopupItems = useMemo(() => {
    const newItems: LayerPopupProps['items'] = [];
    const portalArr = [];
    items.forEach((item) => {
      const newItem = { ...item };
      if (typeof item.layer === 'string') {
        const targetLayer = layerManager.getLayer(item.layer);
        if (targetLayer) {
          // @ts-ignore
          newItem.layer = targetLayer;
        } else {
          console.warn('LayerPopup 中传入了未注册的 layerId');
        }
      }
      if (item.title) {
        const demo = document.createElement('div');
        console.log(newPortal(item.title, demo).portal, 'portal');
        portalArr.push(newPortal(item.title, demo).portal);
        newItem.title = newPortal(item.title, demo).dom;
      }
      if (item.customContent) {
        const demo = document.createElement('div');
        portalArr.push(newPortal(item.customContent, demo).portal);
        newItem.customContent = newPortal(item.customContent, demo).dom;
      }
      const newFields = item.fields.map((field: LayerField) => {
        if (typeof field === 'string') {
          return field;
        } else {
          const newField = { ...field };
          if (field.formatField && typeof field.formatField === 'object') {
            const demo = document.createElement('span');
            portalArr.push(newPortal(field.formatField, demo).portal);
            newField.formatField = newPortal(field.formatField, demo).dom;
          }
          if (field.formatValue && typeof field.formatValue === 'object') {
            const demo = document.createElement('span');
            portalArr.push(newPortal(field.formatValue, demo).portal);
            newField.formatValue = newPortal(field.formatValue, demo).dom;
          }
          return newField;
        }
      });
      console.log(newFields, 'newFields');
      newItem.fields = newFields;
      setPortal(portalArr);
      newItems.push(newItem);
      console.log(newItems, '======>>>>>>');
    });
    return newItems;
  }, [items, layerManager]);

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
      items: layerPopupItems,
      trigger,
    }),
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
      trigger,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lngLat),
      layerPopupItems,
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

  console.log(portal);

  return <>{portal}</>;
};

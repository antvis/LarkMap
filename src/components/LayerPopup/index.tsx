import type { IPopupOption } from '@antv/l7';
import { LayerPopup as L7LayerPopup, LayerPopupConfigItem } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../Control/hooks';
import { useLayerManager, useScene } from '../LarkMap/hooks';
import type { LayerPopupProps } from './types';
import { getElementTypePortal } from './utils';

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
  const [portalList, setPortalList] = useState<React.ReactPortal[]>([]);
  const [layerPopupItems, setLayerPopupItems] = useState<LayerPopupConfigItem[]>([]);
  const layerManager = useLayerManager();

  useEffect(() => {
    const newItems: LayerPopupConfigItem[] = [];
    const newPortalList: React.ReactPortal[] = [];

    items.forEach((item) => {
      const newItem: LayerPopupConfigItem = {
        layer: item.layer,
      };
      // 若 layer 为字符串格式，统一从 LarkMap 的 LayerManger 中获取 layer 实例
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
        const { elementType, portal } = getElementTypePortal(item.title, 'div', setPortalList);
        newPortalList.push(portal);
        newItem.title = elementType;
      }
      if (item.customContent) {
        const { elementType, portal } = getElementTypePortal(item.customContent, 'div', setPortalList);
        newPortalList.push(portal);
        newItem.title = elementType;
      }
      // newItem.fields = item.fields.map((field: LayerField) => {
      //   if (typeof field === 'string') {
      //     return field;
      //   } else {
      //     const newField = { ...field };
      //     if (field.formatField && typeof field.formatField === 'object') {
      //       const demo = document.createElement('span');
      //       newPortalList.push(newPortal(field.formatField, demo).portal);
      //       newField.formatField = newPortal(field.formatField, demo).dom;
      //     }
      //     if (field.formatValue && typeof field.formatValue === 'object') {
      //       const demo = document.createElement('span');
      //       newPortalList.push(newPortal(field.formatValue, demo).portal);
      //       newField.formatValue = newPortal(field.formatValue, demo).dom;
      //     }
      //     return newField;
      //   }
      // });
      newItems.push(newItem);
    });
    setPortalList(newPortalList);
    setLayerPopupItems(newItems);
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

  return <>{portalList}</>;
};

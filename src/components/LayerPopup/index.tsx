import type { IPopupOption, LayerField, LayerPopupConfigItem } from '@antv/l7';
import { LayerPopup as L7LayerPopup } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../Control/hooks';
import { useLayerManager, useScene } from '../LarkMap/hooks';
import type { ILayerField, LayerPopupProps } from './types';
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
  const layerManager = useLayerManager();

  const layerPopupItems = useMemo(() => {
    const newItems: LayerPopupConfigItem[] = [];

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
          console.error('LayerPopup 中传入了未注册的 layerId');
        }
      }

      if (item.title) {
        const { elementType } = getElementTypePortal(item.title, 'div', setPortalList);
        newItem.title = elementType;
      }
      if (item.customContent) {
        const { elementType } = getElementTypePortal(item.customContent, 'div', setPortalList);
        newItem.customContent = elementType;
      }
      if (item.fields?.length) {
        newItem.fields = item.fields.map((field: ILayerField) => {
          if (typeof field === 'string') {
            return field;
          } else {
            const newField: LayerField = { field: field.field, getValue: field.getValue };
            if (field.formatField) {
              const { elementType } = getElementTypePortal(field.formatField, 'span', setPortalList);
              newField.formatField = elementType;
            }
            if (field.formatValue) {
              const { elementType } = getElementTypePortal(field.formatValue, 'span', setPortalList);
              newField.formatValue = elementType;
            }
            return newField;
          }
        });
      }
      newItems.push(newItem);
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
    if (popup) {
      scene.removePopup(popup);
      setPopup(undefined);
    }
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

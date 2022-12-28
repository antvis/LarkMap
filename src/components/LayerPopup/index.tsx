import type { ILayer, IPopupOption, LayerField, LayerPopupConfigItem } from '@antv/l7';
import { LayerPopup as L7LayerPopup } from '@antv/l7';
import type { ICompositeLayer } from '@antv/l7-composite-layers';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import type { Layer } from '../../types';
import { getStyleText } from '../../utils';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../Control/hooks';
import { useLayerList, useScene } from '../LarkMap/hooks';
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
  const fullLayerList = useLayerList();

  const layerPopupItems = useMemo(() => {
    const result: LayerPopupConfigItem[] = [];

    items.forEach((item) => {
      let originLayer: Layer | undefined;
      // 若 layer 为字符串格式，统一从 LarkMap 的 LayerManger 中获取 layer 实例
      if (typeof item.layer === 'string') {
        const targetLayer = fullLayerList.find((layer) => layer.id === item.layer);
        if (targetLayer) {
          originLayer = targetLayer;
        } else {
          // 在传 Layer id 的情况下，如果未找到目标图层实例则直接跳过当前配置项
          return;
        }
      } else {
        originLayer = item.layer;
      }

      const layers: ILayer[] = [];

      if (originLayer.isComposite) {
        // 若 originLayer 为交互图层，
        // @ts-ignore
        layers.push(...(originLayer as ICompositeLayer).getInteractionSubLayers());
      } else {
        // @ts-ignore
        layers.push(originLayer);
      }

      layers.forEach((layer) => {
        const newItem: LayerPopupConfigItem = { layer };

        if (item.title) {
          newItem.title = getElementTypePortal(item.title, 'div');
        }
        if (item.customContent) {
          newItem.customContent = getElementTypePortal(item.customContent, 'div');
        }
        if (item.fields?.length) {
          newItem.fields = item.fields.map((field: ILayerField) => {
            if (typeof field === 'string') {
              return field;
            } else {
              const newField: LayerField = { field: field.field, getValue: field.getValue };
              if (field.formatField) {
                newField.formatField = getElementTypePortal(field.formatField, 'span');
              }
              if (field.formatValue) {
                newField.formatValue = getElementTypePortal(field.formatValue, 'span');
              }
              return newField;
            }
          });
        }

        result.push(newItem);
      });
    });

    console.log(result);
    return result;
  }, [fullLayerList, items]);

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
    scene.addPopup(newPopup);
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

  return <></>;
};

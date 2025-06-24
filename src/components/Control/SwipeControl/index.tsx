import type { IZoomControlOption } from '@antv/l7';
import { Swipe as L7Swipe } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useLayerList, useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { SwipeControlProps } from './types';

export const SwipeControl: React.FC<SwipeControlProps> = ({
  onShow,
  onHide,
  onAdd,
  onRemove,
  onMoving,
  className,
  style,
  rightLayers,
  layers: layerItems,
  ratio,
  orientation,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Swipe | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const fullLayerList = useLayerList();

  const layers = (defaultLayers) => {
    return defaultLayers?.length
      ? defaultLayers
          .map((layerItem) => {
            if (typeof layerItem === 'string') {
              return fullLayerList.find((layer) => layer.id === layerItem);
            }
            if (!Object.prototype.hasOwnProperty.call(layerItem, 'isComposite')) {
              //@ts-ignore
              const { layer } = layerItem;

              if (typeof layer === 'string') {
                const targetLayer = fullLayerList.find((item) => item.id === layer);
                return targetLayer ? { ...layerItem, layer: targetLayer } : undefined;
              }
              return layerItem;
            }

            return layerItem;
          })
          .filter((layer) => !!layer)
          .map((layerItem) => {
            //@ts-ignore
            return layerItem.subLayers ? layerItem.subLayers.getLayers().map((layer) => layer.layer) : layerItem.layer;
          })
          .flat()
      : fullLayerList;
  };

  const controlOptions: Partial<IZoomControlOption> = useMemo(() => {
    return {
      rightLayers: layers(rightLayers),
      layers: layers(layerItems),
      ratio,
      orientation,
      style: styleText,
    };
  }, [className, styleText, rightLayers, layers, ratio, orientation]);

  useEffect(() => {
    const swipe = new L7Swipe(omitBy(controlOptions, (value) => value === undefined));
    setControl(swipe);
    scene.addControl(swipe);
    return () => {
      scene.removeControl(swipe);
      setControl(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useL7ComponentUpdate(control, controlOptions);

  useL7ComponentEvent(control, {
    add: onAdd,
    remove: onRemove,
    show: onShow,
    hide: onHide,
    moving: onMoving,
  });

  return <></>;
};

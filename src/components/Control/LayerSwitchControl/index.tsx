import type { IGeoLocateOption } from '@antv/l7';
import { LayerSwitch as L7LayerSwitch } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useLayerList, useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../hooks';
import type { LayerSwitchControlProps, LayerSwitchItem } from './types';

export const LayerSwitchControl: React.FC<LayerSwitchControlProps> = ({
  layers: layerItems,
  popperPlacement,
  popperTrigger,
  popperClassName,
  btnIcon,
  btnText,
  title,
  vertical,
  position,
  className,
  style,
  multiple,
  onAdd,
  onRemove,
  onShow,
  onHide,
  onPopperShow,
  onPopperHide,
  onSelectChange,
}) => {
  const scene = useScene();
  const fullLayerList = useLayerList();
  const [control, setControl] = useState<L7LayerSwitch | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: btnIconPortal, dom: btnIconDOM } = useL7ComponentPortal(btnIcon);

  const layers = useMemo(() => {
    return layerItems?.length
      ? layerItems
          .map((layerItem) => {
            if (typeof layerItem === 'string') {
              return fullLayerList.find((layer) => layer.id === layerItem);
            }
            // 当 layerItem 为 LayerSwitchItem 类型
            if (!Object.prototype.hasOwnProperty.call(layerItem, 'isComposite')) {
              const { layer } = layerItem as LayerSwitchItem;
              if (typeof layer === 'string') {
                const targetLayer = fullLayerList.find((item) => item.id === layer);
                return targetLayer ? { ...layerItem, layer: targetLayer } : undefined;
              }
              return layerItem;
            }
            return layerItem;
          })
          .filter((layer) => !!layer)
      : fullLayerList;
  }, [layerItems, fullLayerList]);

  const controlOptions: Partial<IGeoLocateOption> = useMemo(() => {
    return {
      layers,
      popperPlacement,
      popperTrigger,
      popperClassName,
      btnText,
      title,
      vertical,
      position,
      className,
      multiple,
      style: styleText,
      btnIcon: btnIconDOM,
    };
  }, [
    layers,
    popperPlacement,
    popperTrigger,
    popperClassName,
    btnText,
    title,
    vertical,
    position,
    className,
    multiple,
    styleText,
    btnIconDOM,
  ]);

  useEffect(() => {
    const layerSwitch = new L7LayerSwitch(omitBy(controlOptions, (value) => value === undefined));
    setControl(layerSwitch);
    scene.addControl(layerSwitch);
    return () => {
      scene.removeControl(layerSwitch);
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
    popperShow: onPopperShow,
    popperHide: onPopperHide,
    selectChange: onSelectChange,
  });

  return <>{btnIconPortal}</>;
};

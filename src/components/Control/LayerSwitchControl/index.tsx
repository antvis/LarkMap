import type { IGeoLocateOption, ILayerSwitchOption } from '@antv/l7';
import { LayerSwitch as L7LayerSwitch } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useLayerManager, useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../hooks';
import type { LayerSwitchControlProps } from './types';

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
  onAdd,
  onRemove,
  onShow,
  onHide,
  onPopperShow,
  onPopperHide,
  onSelectChange,
}) => {
  const scene = useScene();
  const layerManager = useLayerManager();
  const [control, setControl] = useState<L7LayerSwitch | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: btnIconPortal, dom: btnIconDOM } = useL7ComponentPortal(btnIcon);
  const [layers, setLayers] = useState<ILayerSwitchOption['layers']>([]);

  useLayoutEffect(() => {
    setLayers(
      layerItems
        .map((layerItem) => {
          if (layerItem instanceof Object) {
            return layerItem;
          } else {
            return layerManager.getLayer(layerItem);
          }
        })
        .filter((item) => !!item),
    );
  }, [layerItems, layerManager]);

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
    styleText,
    btnIconDOM,
  ]);

  useMount(() => {
    const layerSwitch = new L7LayerSwitch(omitBy(controlOptions, (value) => value === undefined));
    setControl(layerSwitch);
    scene.addControl(layerSwitch);
  });

  useUnmount(() => {
    if (control) {
      scene.removeControl(control);
      setControl(undefined);
    }
  });

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

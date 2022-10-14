import type React from 'react';
import type { IGeoLocateOption } from '@antv/l7';
import { useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { LayerControl as L7LayerControl } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useControlEvent, useControlUpdate } from '../hooks';
import type { LayerControlProps } from './types';

export const LayerControl: React.FC<LayerControlProps> = ({
  layers,
  popperPlacement,
  popperTrigger,
  popperClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [control, setControl] = useState<L7LayerControl | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  // TODO:btnIcon 从 ReactNode => Element 还没好
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
  ]);

  useMount(() => {
    const layerControl = new L7LayerControl(omitBy(controlOptions, (value) => value === undefined));
    setControl(layerControl);
    setTimeout(() => {
      scene.addControl(layerControl);
    }, 0);
  });

  useUnmount(() => {
    scene.removeControl(control);
    setControl(control);
  });

  useControlUpdate(control, controlOptions);

  useControlEvent(control, {
    add: onAdd,
    remove: onRemove,
    show: onShow,
    hide: onHide,
    popperShow: onPopperShow,
    popperHide: onPopperHide,
    selectChange: onSelectChange,
  });

  return null;
};

import type React from 'react';
import { useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { MapTheme as L7MapTheme } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useControlEvent, useControlUpdate } from '../hooks';
import type { IMapThemeControlProps, MapThemeControlProps } from './types';

export const MapThemeControl: React.FC<MapThemeControlProps> = ({
  popperPlacement,
  btnText,
  title,
  vertical,
  position,
  className,
  options,
  popperTrigger,
  popperClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  btnIcon,
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
  const [control, setControl] = useState<L7MapTheme | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  // TODO:btnIcon 从 ReactNode => Element 还没好
  const controlOptions: Partial<IMapThemeControlProps> = useMemo(() => {
    return {
      popperPlacement,
      popperTrigger,
      popperClassName,
      btnText,
      title,
      vertical,
      position,
      className,
      options,
      style: styleText,
    };
  }, [
    options,
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
    const mapTheme = new L7MapTheme(omitBy(controlOptions, (value) => value === undefined));
    setControl(mapTheme);
    setTimeout(() => {
      scene.addControl(mapTheme);
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

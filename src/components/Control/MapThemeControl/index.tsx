import React, { useMemo, useState } from 'react';
import type { ISelectControlOption } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { MapTheme as L7MapTheme } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentPortal, useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { MapThemeControlProps } from './types';

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
  const { portal: btnIconPortal, dom: btnIconDOM } = useL7ComponentPortal(btnIcon);

  const controlOptions: Partial<ISelectControlOption> = useMemo(() => {
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
      btnIcon: btnIconDOM,
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
    btnIconDOM,
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
    setControl(undefined);
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

import React, { useMemo, useState } from 'react';
import type { IFullscreenControlOption } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { Fullscreen as L7Fullscreen } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useControlElement, useControlEvent, useControlUpdate } from '../hooks';
import type { FullscreenControlProps } from './type';

export const FullscreenControl: React.FC<FullscreenControlProps> = ({
  onShow,
  onHide,
  onAdd,
  onRemove,
  onFullscreenChange,
  btnIcon,
  btnText,
  title,
  vertical,
  exitBtnIcon,
  exitBtnText,
  exitTitle,
  position,
  className,
  style,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Fullscreen | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: btnIconPortal, dom: btnIconDOM } = useControlElement(btnIcon);
  const { portal: exitBtnIconPortal, dom: exitBtnIconDOM } = useControlElement(exitBtnIcon);

  const controlOptions: Partial<IFullscreenControlOption> = useMemo(() => {
    return {
      btnText,
      title,
      vertical,
      exitBtnText,
      exitTitle,
      position,
      className,
      style: styleText,
      btnIcon: btnIconDOM,
      exitBtnIcon: exitBtnIconDOM,
    };
  }, [btnText, title, vertical, exitBtnText, exitTitle, position, className, styleText, btnIconDOM, exitBtnIconDOM]);

  useMount(() => {
    const fullscreen = new L7Fullscreen(omitBy(controlOptions, (value) => value === undefined));
    setControl(fullscreen);
    setTimeout(() => {
      scene.addControl(fullscreen);
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
    fullscreenChange: onFullscreenChange,
  });

  return (
    <>
      {btnIconPortal}
      {exitBtnIconPortal}
    </>
  );
};

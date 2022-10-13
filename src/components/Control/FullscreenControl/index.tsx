import type React from 'react';
import { useMemo, useState } from 'react';
import type { IFullscreenControlOption } from '@antv/l7';
import { Fullscreen as L7Fullscreen } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useControlEvent, useControlUpdate } from '../hooks';
import type { FullscreenControlProps } from './type';

export const FullscreenControl: React.FC<FullscreenControlProps> = ({
  onShow,
  onHide,
  onAdd,
  onRemove,
  fullscreenChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  btnIcon,
  btnText,
  title,
  vertical,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // TODO:btnIcon 和 exitBtnIcon 从 ReactNode => Element 还没好
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
    };
  }, [btnText, title, vertical, exitBtnText, exitTitle, position, className, styleText]);

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
    fullscreenChange: fullscreenChange,
  });

  return null;
};

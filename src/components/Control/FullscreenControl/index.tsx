import type { IFullscreenControlOption } from '@antv/l7';
import { Fullscreen as L7Fullscreen } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../hooks';
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
  const { portal: btnIconPortal, dom: btnIconDOM } = useL7ComponentPortal(btnIcon);
  const { portal: exitBtnIconPortal, dom: exitBtnIconDOM } = useL7ComponentPortal(exitBtnIcon);

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

  useEffect(() => {
    const fullscreen = new L7Fullscreen(omitBy(controlOptions, (value) => value === undefined));
    setControl(fullscreen);
    scene.addControl(fullscreen);
    return () => {
      scene.removeControl(fullscreen);
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
    fullscreenChange: onFullscreenChange,
  });

  return (
    <>
      {btnIconPortal}
      {exitBtnIconPortal}
    </>
  );
};

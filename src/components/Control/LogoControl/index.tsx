import type { ILogoControlOption } from '@antv/l7';
import { Logo as L7Logo } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import type React from 'react';
import { useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { LogoControlProps } from './types';

export const LogoControl: React.FC<LogoControlProps> = ({
  img,
  href,
  position,
  className,
  style,
  onShow,
  onHide,
  onAdd,
  onRemove,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Logo | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  const controlOptions: Partial<ILogoControlOption> = useMemo(() => {
    return {
      img,
      href,
      position,
      className,
      style: styleText,
    };
  }, [img, href, position, className, styleText]);

  useMount(() => {
    const exportImage = new L7Logo(omitBy(controlOptions, (value) => value === undefined));
    setControl(exportImage);
    scene.addControl(exportImage);
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
  });
  return null;
};

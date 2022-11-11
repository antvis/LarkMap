import type React from 'react';
import type { IMouseLocationControlOption } from '@antv/l7';
import { useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { MouseLocation as L7MouseLocation } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { MouseLocationControlProps } from './types';

export const MouseLocationControl: React.FC<MouseLocationControlProps> = ({
  position,
  className,
  style,
  onLocationChange,
  transform,
  onAdd,
  onRemove,
  onShow,
  onHide,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7MouseLocation | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  const controlOptions: Partial<IMouseLocationControlOption> = useMemo(() => {
    return {
      transform,
      position,
      className,
      style: styleText,
    };
  }, [transform, position, className, styleText]);

  useMount(() => {
    const mouseLocation = new L7MouseLocation(omitBy(controlOptions, (value) => value === undefined));
    setControl(mouseLocation);
    setTimeout(() => {
      scene.addControl(mouseLocation);
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
    locationChange: onLocationChange,
  });

  return null;
};

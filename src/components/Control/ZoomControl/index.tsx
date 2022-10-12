import type React from 'react';
import type { IZoomControlOption } from '@antv/l7';
import { Zoom as L7Zoom } from '@antv/l7';
import { useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { useScene } from '../../LarkMap/hooks';
import { useControlEvent, useControlUpdate } from '../hooks';
import { getStyleText } from '../../../utils';
import type { ZoomControlProps } from './types';

export const ZoomControl: React.FC<ZoomControlProps> = ({
  onShow,
  onHide,
  onAdd,
  onRemove,
  position,
  name,
  className,
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zoomInText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zoomOutText,
  zoomInTitle,
  zoomOutTitle,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Zoom | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  // TODO:zoomInText 和 zoomOutText 从 ReactNode => Element 还没好
  const controlOptions: Partial<IZoomControlOption> = useMemo(() => {
    return {
      position,
      name,
      className,
      style: styleText,
      zoomInTitle,
      zoomOutTitle,
    };
  }, [position, name, className, styleText, zoomInTitle, zoomOutTitle]);

  useMount(() => {
    const zoom = new L7Zoom(omitBy(controlOptions, (value) => value === undefined));
    setControl(zoom);
    setTimeout(() => {
      scene.addControl(zoom);
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
  });

  return null;
};

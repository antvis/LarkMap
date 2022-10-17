import React, { useMemo, useState } from 'react';
import type { IZoomControlOption } from '@antv/l7';
import { Zoom as L7Zoom } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { useScene } from '../../LarkMap/hooks';
import { useControlEvent, useControlUpdate, useControlElement } from '../hooks';
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
  zoomInText,
  zoomOutText,
  zoomInTitle,
  zoomOutTitle,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Zoom | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: zoomInTextPortal, dom: zoomInTextDOM } = useControlElement(zoomInText);
  const { portal: zoomOutTextPortal, dom: zoomOutTextDOM } = useControlElement(zoomOutText);

  // TODO:zoomInText 和 zoomOutText 从 ReactNode => Element 还没好
  const controlOptions: Partial<IZoomControlOption> = useMemo(() => {
    return {
      position,
      name,
      className,
      zoomInTitle,
      zoomOutTitle,
      style: styleText,
      zoomInText: zoomInTextDOM,
      zoomOutText: zoomOutTextDOM,
    };
  }, [position, name, className, styleText, zoomInTitle, zoomOutTitle, zoomInTextDOM, zoomOutTextDOM]);

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

  return (
    <>
      {zoomInTextPortal}
      {zoomOutTextPortal}
    </>
  );
};

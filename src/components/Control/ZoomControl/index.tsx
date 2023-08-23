import type { IZoomControlOption } from '@antv/l7';
import { Zoom as L7Zoom } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../hooks';
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
  showZoom,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Zoom | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: zoomInTextPortal, dom: zoomInTextDOM } = useL7ComponentPortal(zoomInText);
  const { portal: zoomOutTextPortal, dom: zoomOutTextDOM } = useL7ComponentPortal(zoomOutText);

  const controlOptions: Partial<IZoomControlOption> = useMemo(() => {
    return {
      position,
      name,
      className,
      zoomInTitle,
      zoomOutTitle,
      showZoom,
      style: styleText,
      zoomInText: zoomInTextDOM,
      zoomOutText: zoomOutTextDOM,
    };
  }, [position, name, className, styleText, zoomInTitle, zoomOutTitle, zoomInTextDOM, zoomOutTextDOM, showZoom]);

  useEffect(() => {
    const zoom = new L7Zoom(omitBy(controlOptions, (value) => value === undefined));
    setControl(zoom);
    scene.addControl(zoom);
    return () => {
      scene.removeControl(zoom);
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
  });

  return (
    <>
      {zoomInTextPortal}
      {zoomOutTextPortal}
    </>
  );
};

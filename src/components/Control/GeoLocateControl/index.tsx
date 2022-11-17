import React, { useMemo, useState } from 'react';
import type { IGeoLocateOption } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { GeoLocate as L7GeoLocate } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentPortal, useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { GeoLocateControlProps } from './type';

export const GeoLocateControl: React.FC<GeoLocateControlProps> = ({
  transform,
  onShow,
  onHide,
  onAdd,
  onRemove,
  btnIcon,
  btnText,
  title,
  vertical,
  position,
  className,
  style,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7GeoLocate | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: btnIconPortal, dom: btnIconDOM } = useL7ComponentPortal(btnIcon);

  const controlOptions: Partial<IGeoLocateOption> = useMemo(() => {
    return {
      btnText,
      title,
      vertical,
      position,
      className,
      style: styleText,
      transform,
      btnIcon: btnIconDOM,
    };
  }, [btnText, title, vertical, position, className, styleText, transform, btnIconDOM]);

  useMount(() => {
    const geoLocate = new L7GeoLocate(omitBy(controlOptions, (value) => value === undefined));
    setControl(geoLocate);
    setTimeout(() => {
      scene.addControl(geoLocate);
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
  });

  return <>{btnIconPortal}</>;
};

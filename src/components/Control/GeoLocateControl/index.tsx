import type { IGeoLocateOption } from '@antv/l7';
import { GeoLocate as L7GeoLocate } from '@antv/l7';
import { omitBy } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentPortal, useL7ComponentUpdate } from '../hooks';
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

  useEffect(() => {
    const geoLocate = new L7GeoLocate(omitBy(controlOptions, (value) => value === undefined));
    setControl(geoLocate);
    scene.addControl(geoLocate);
    return () => {
      scene.removeControl(geoLocate);
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

  return <>{btnIconPortal}</>;
};

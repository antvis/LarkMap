import type { IGeoLocateOption } from '@antv/l7';
import { GeoLocate as L7GeoLocate } from '@antv/l7';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import gcoord from 'gcoord';
import { getStyleText } from '../../../utils';
import { useControlEvent, useControlUpdate } from '../hooks';
import { useScene } from '../../LarkMap/hooks';
import type { GeoLocateControlProps } from './type';

export const GeoLocateControl: React.FC<GeoLocateControlProps> = ({
  transform,
  onShow,
  onHide,
  onAdd,
  onRemove,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // TODO:btnIcon 从 ReactNode => Element 还没好
  const controlOptions: Partial<IGeoLocateOption> = useMemo(() => {
    return {
      btnText,
      title,
      vertical,
      position,
      className,
      style: styleText,
      transform: (positions) => {
        // 将获取到基于 WGS84 地理坐标系 的坐标转成 GCJ02 坐标系
        return gcoord.transform(positions, gcoord.WGS84, gcoord.GCJ02);
      },
    };
  }, [btnText, title, vertical, position, className, styleText, transform]);

  useMount(() => {
    const geoLocate = new L7GeoLocate(omitBy(controlOptions, (value) => value === undefined));
    setControl(geoLocate);
    setTimeout(() => {
      scene.addControl(geoLocate);
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

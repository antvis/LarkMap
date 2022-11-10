import type React from 'react';
import { useMemo, useState } from 'react';
import type { IScaleControlOption } from '@antv/l7';
import { Scale as L7Scale } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useL7ComponentEvent, useL7ComponentUpdate } from '../hooks';
import type { ScaleControlProps } from './type';

export const ScaleControl: React.FC<ScaleControlProps> = ({
  onShow,
  onHide,
  onAdd,
  onRemove,
  position,
  className,
  style,
  lockWidth,
  maxWidth,
  metric,
  imperial,
  updateWhenIdle,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Scale | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);

  const controlOptions: Partial<IScaleControlOption> = useMemo(() => {
    return {
      position,
      className,
      style: styleText,
      lockWidth,
      maxWidth,
      metric,
      imperial,
      updateWhenIdle,
    };
  }, [position, className, styleText, lockWidth, maxWidth, metric, imperial, updateWhenIdle]);

  useMount(() => {
    const scale = new L7Scale(omitBy(controlOptions, (value) => value === undefined));
    setControl(scale);
    setTimeout(() => {
      scene.addControl(scale);
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

  return null;
};

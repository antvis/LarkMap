import React, { useMemo, useState } from 'react';
import type { IExportImageControlOption } from '@antv/l7';
import { useMount, useUnmount } from 'ahooks';
import { omitBy } from 'lodash-es';
import { ExportImage as L7ExportImage } from '@antv/l7';
import { getStyleText } from '../../../utils';
import { useScene } from '../../LarkMap/hooks';
import { useControlElement, useControlEvent, useControlUpdate } from '../hooks';
import type { ExportImageControlProps } from './types';

export const ExportImageControl: React.FC<ExportImageControlProps> = ({
  onExport,
  onShow,
  onHide,
  onAdd,
  onRemove,
  imageType,
  btnIcon,
  btnText,
  title,
  vertical,
  position,
  className,
  style,
}) => {
  const scene = useScene();
  const [control, setControl] = useState<L7ExportImage | undefined>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const { portal: btnIconPortal, dom: btnIconDOM } = useControlElement(btnIcon);

  const controlOptions: Partial<IExportImageControlOption> = useMemo(() => {
    return {
      btnText,
      title,
      vertical,
      position,
      className,
      imageType,
      style: styleText,
      btnIcon: btnIconDOM,
      onExport,
    };
  }, [btnText, title, vertical, position, className, styleText, imageType, onExport, btnIconDOM]);

  useMount(() => {
    const exportImage = new L7ExportImage(omitBy(controlOptions, (value) => value === undefined));
    setControl(exportImage);
    setTimeout(() => {
      scene.addControl(exportImage);
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

  return <>{btnIconPortal}</>;
};

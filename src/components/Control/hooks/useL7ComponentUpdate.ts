import type { Control, Popup } from '@antv/l7';
import { useTrackedEffect } from 'ahooks';
import { useEffect, useMemo, useRef } from 'react';

/**
 * 监听 control 的 options 中各项是否发生变化，若有变化则调用 control.setOptions 传入更新的配置
 * @param control
 * @param options
 */
export const useL7ComponentUpdate = <C extends Control | Popup, O extends Record<string, any>>(
  control: C,
  options: Partial<O>,
) => {
  const isFirst = useRef(true);
  const isAdded = useRef(false);
  const keyList = useMemo(() => Object.keys(options) as (keyof O)[], [options]);

  useEffect(() => {
    // @ts-ignore
    control?.on('open', () => {
      isAdded.current = true;
    });
  }, [control]);

  useTrackedEffect((updateIndexes) => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!isAdded.current) {
      return;
    }
    const updateOptions: Partial<O> = {};
    updateIndexes.forEach((updateIndex) => {
      const key = keyList[updateIndex];
      updateOptions[key] = options[key];
    });
    control?.setOptions(updateOptions);
  }, Object.values(options));
};

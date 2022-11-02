import type { Control } from '@antv/l7';
import { useTrackedEffect } from 'ahooks';
import { useMemo, useRef } from 'react';

/**
 * 监听 control 的 options 中各项是否发生变化，若有变化则调用 control.setOptions 传入更新的配置
 * @param control
 * @param options
 */
export const useControlUpdate = <C extends Control, O = C['controlOption']>(control: C, options: Partial<O>) => {
  const isFirst = useRef(true);
  const keyList = useMemo(() => Object.keys(options) as (keyof O)[], [options]);

  useTrackedEffect((updateIndexes) => {
    if (isFirst.current) {
      isFirst.current = false;
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

import { useUnmount } from 'ahooks';
import type EventEmitter from 'eventemitter3';
import { useEffect, useMemo } from 'react';

type CallbackFunction = (...args: any[]) => any;

/**
 * 为 Control 绑定对应事件的回调，并且在回调函数发生更新时重新绑定
 * @param control
 * @param props
 */
export const useL7ComponentEvent = <C extends EventEmitter<any>>(
  control: C,
  props: Record<string, CallbackFunction>,
) => {
  const eventNameList = useMemo(() => Object.keys(props), [props]);

  useEffect(() => {
    if (control) {
      eventNameList.forEach((eventName) => {
        const callback = props[eventName];
        if (callback) {
          control.on(eventName, callback);
        }
      });
    }

    return () => {
      if (control) {
        eventNameList.forEach((eventName) => {
          const callback = props[eventName];
          if (callback) {
            control.off(eventName, callback);
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control, ...Object.values(props)]);

  useUnmount(() => {
    if (!control) {
      return;
    }
    eventNameList.forEach((eventName) => {
      const callback = props[eventName];
      if (callback) {
        control.off(eventName, callback);
      }
    });
  });
};

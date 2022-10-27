import type { Control, Popup } from '@antv/l7';
import { useEffect, useMemo } from 'react';
import { useUnmount } from 'ahooks';

type CallbackFunction = (...args: any[]) => any;

/**
 * 为 Popup 绑定对应事件的回调，并且在回调函数发生更新时重新绑定
 * @param popup
 * @param props
 */
export const usePopupEvent = <C extends Popup>(popup: C, props: Record<string, CallbackFunction>) => {
  const eventNameList = useMemo(() => Object.keys(props), [props]);

  useEffect(() => {
    if (popup) {
      eventNameList.forEach((eventName) => {
        const callback = props[eventName];
        if (callback) {
          popup.on(eventName, callback);
        }
      });
    }

    return () => {
      if (popup) {
        eventNameList.forEach((eventName) => {
          const callback = props[eventName];
          if (callback) {
            popup.off(eventName, callback);
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup, ...Object.values(props)]);

  useUnmount(() => {
    if (!popup) {
      return;
    }
    eventNameList.forEach((eventName) => {
      const callback = props[eventName];
      if (callback) {
        popup.off(eventName, callback);
      }
    });
  });
};

import { DrawEvent } from '@antv/l7-draw';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomControl } from '../../CustomControl';
import { CLS_PREFIX, CTRL_REGEXP, KEYBOARD_TITLE_MAP } from './constant';
import './index.less';
import type { DrawKeyboardHelperProps, KeyboardItem } from './types';

export const DrawKeyboardHelper: React.FC<DrawKeyboardHelperProps> = ({ className, style, position, draw }) => {
  const [keyboardList, setKeyboardList] = useState<KeyboardItem[]>([]);

  const updateKeyboardList = useCallback(() => {
    if (!draw || !draw?.getIsEnable()) {
      setKeyboardList([]);
      return;
    }
    // @ts-ignore
    const { keyboard } = draw.options;
    const newKeyboardList: KeyboardItem[] = [];

    Object.entries(KEYBOARD_TITLE_MAP).forEach(([key, title]) => {
      let keyboards: string[] = keyboard[key] ?? [];
      if (!keyboards.length) {
        return;
      }
      if (keyboards.every((item) => CTRL_REGEXP.test(item))) {
        keyboards = Array.from(new Set(keyboards.map((item) => item.replace(CTRL_REGEXP, 'ctrl/cmd'))));
      }
      newKeyboardList.push({
        title,
        keyboards,
      });
    });
    setKeyboardList(newKeyboardList);
  }, [draw]);

  useEffect(() => {
    if (draw) {
      if (draw?.getIsEnable()) {
        updateKeyboardList();
      } else {
        draw?.on(DrawEvent.enable, updateKeyboardList);
        draw?.on(DrawEvent.disable, updateKeyboardList);
      }
    } else {
      setKeyboardList([]);
    }
    return () => {
      draw?.off(DrawEvent.enable, updateKeyboardList);
      draw?.off(DrawEvent.disable, updateKeyboardList);
    };
  }, [draw, updateKeyboardList]);

  return keyboardList.length ? (
    <CustomControl position={position}>
      <div className={classNames(className, 'l7-bar', `${CLS_PREFIX}_container`)} style={style}>
        {keyboardList.map((item) => {
          return (
            <div key={item.title}>
              {item.title}：{item.keyboards.join('/')}
            </div>
          );
        })}
      </div>
    </CustomControl>
  ) : null;
};

DrawKeyboardHelper.defaultProps = {
  position: 'bottomright',
};

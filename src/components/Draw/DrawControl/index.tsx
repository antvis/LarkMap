import { DrawerEvent } from '@antv/l7-draw';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomControl } from '../../CustomControl';
import { useScene } from '../../LarkMap/hooks';
import { CLS_PREFIX, DEFAULT_DRAW_CONFIG, DRAW_MAP, DRAW_TYPES } from './constant';
import './index.less';
import type { ControlItem, DrawControlProps, DrawType } from './types';

export type { DrawControlProps };

export const DrawControl: React.FC<DrawControlProps> = ({ position, config, vertical, data, onChange }) => {
  const scene = useScene();

  // Draw信息列表
  const [controlList, setControlList] = useState<ControlItem[]>([]);

  // 当前激活的下标
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (scene) {
      const newControlList: ControlItem[] = [];
      Object.entries(config).forEach(([controlType, controlConfig]) => {
        if (!controlConfig) {
          return;
        }
        const Draw = DRAW_MAP[controlType];
        const mergeDrawConfig = {
          ...DEFAULT_DRAW_CONFIG[controlType],
          ...(typeof controlConfig === 'object' ? controlConfig : {}),
        };
        if (DRAW_TYPES.includes(controlType as DrawType) && Draw) {
          const draw = new Draw(scene, mergeDrawConfig.options);
          newControlList.push({
            draw,
            type: controlType,
            icon: mergeDrawConfig.icon,
            title: mergeDrawConfig.title,
          });
        } else {
          newControlList.push({
            type: controlType,
            icon: mergeDrawConfig.icon,
            title: mergeDrawConfig.title,
          });
        }
      });
      setControlList(newControlList);
      setActiveIndex(-1);
    }
  }, [scene, config]);

  // useEffect(() => {
  //   if (controlList.length && value) {
  //     for (const controlItem of controlList) {
  //       const data = value[controlItem.type];
  //       if (controlItem.draw && Array.isArray(data) && controlItem.draw.getData() !== data) {
  //         controlItem.draw.setData(data);
  //       }
  //     }
  //   }
  // }, [value, controlList]);

  // const onDebounceChange = useDebou

  useEffect(() => {
    const callbackMap: Partial<Record<DrawType, () => void>> = {};
    for (const controlItem of controlList) {
      const { draw, type } = controlItem;
      if (draw) {
        const callback = (newData: any[]) => {
          const newValue = {
            ...data,
            [type]: newData,
          };
          onChange?.(newValue);
        };
        draw.on(DrawerEvent.change, callback);
        callbackMap[type] = callback;
      }
    }
    return () => {
      for (const controlItem of controlList) {
        const draw = controlItem.draw;
        const callback = callbackMap[controlItem.type];
        if (draw && callback) {
          draw.off(DrawerEvent.change, callback);
        }
      }
    };
  }, [data, onChange, controlList]);

  const onControlClick = useCallback(
    (item: ControlItem, index: number) => {
      if (activeIndex > -1 && activeIndex !== index) {
        controlList[activeIndex].draw?.disable();
      }
      const currentControl = controlList[index].draw;
      if (currentControl?.getIsEnable()) {
        currentControl?.disable();
        setActiveIndex(-1);
      } else {
        currentControl?.enable();
        setActiveIndex(index);
      }
    },
    [activeIndex, controlList],
  );

  const onClear = useCallback(() => {
    for (const controlItem of controlList) {
      controlItem.draw?.clear();
    }
  }, [controlList]);

  return (
    <CustomControl name="drawControl" position={position}>
      <div
        className={classNames({
          'l7-bar': true,
          [`${CLS_PREFIX}_container`]: true,
          [`${CLS_PREFIX}_container__vertical`]: vertical,
        })}
      >
        {controlList.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              title={item.title}
              className={classNames({
                [`${CLS_PREFIX}_btn`]: true,
                [`${CLS_PREFIX}_btn__active`]: isActive,
              })}
              onClick={() => {
                const controlItem = controlList[index];
                if (controlItem.draw) {
                  onControlClick(controlItem, index);
                } else if (controlItem.type === 'clear') {
                  onClear();
                }
              }}
            >
              <Icon isActive={isActive} />
            </button>
          );
        })}
      </div>
    </CustomControl>
  );
};

DrawControl.defaultProps = {
  position: 'topleft',
  config: {
    point: {},
    line: {},
    polygon: {},
    rect: {},
    circle: {},
    clear: {},
  },
  vertical: false,
};

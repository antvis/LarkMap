import type { BaseMode } from '@antv/l7-draw';
import { DrawEvent } from '@antv/l7-draw';
import { useDebounceEffect, useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomControl } from '../../CustomControl';
import { useScene } from '../../LarkMap/hooks';
import { CLS_PREFIX, DEFAULT_DRAW_CONFIG, DRAW_MAP, DRAW_TYPES } from './constant';
import './index.less';
import type { ControlItem, DrawControlProps, DrawType } from './types';

export type { DrawControlProps };

export const DrawControl: React.FC<DrawControlProps> = ({
  className,
  style,
  position,
  config,
  vertical,
  data,
  onChange,
  drawStyle,
  multiple,
  editable,
  autoFocus,
  addMultiple,
}) => {
  const scene = useScene();

  // Draw信息列表
  const [controlList, setControlList] = useState<ControlItem[]>([]);

  // 当前激活的下标
  const [activeIndex, setActiveIndex] = useState(-1);

  // 内置
  const [realData, setRealData] = useState(data ?? {});

  useEffect(() => {
    const newControlList: ControlItem[] = [];
    if (scene) {
      Object.entries(config).forEach(([controlType, controlConfig], index) => {
        if (!controlConfig) {
          return;
        }
        const Draw = DRAW_MAP[controlType];
        const mergeDrawConfig = {
          ...DEFAULT_DRAW_CONFIG[controlType],
          ...(typeof controlConfig === 'object' ? controlConfig : {}),
        };
        mergeDrawConfig.options = {
          style: drawStyle,
          multiple,
          autoFocus,
          editable,
          addMultiple,
          ...mergeDrawConfig.options,
        };
        let draw: BaseMode<any> = undefined;
        if (DRAW_TYPES.includes(controlType as DrawType) && Draw) {
          draw = new Draw(scene, mergeDrawConfig.options);
        }
        newControlList.push({
          draw,
          type: controlType,
          icon: mergeDrawConfig.icon,
          title: mergeDrawConfig.title,
        });
      });
      setControlList(newControlList);
      setActiveIndex(-1);
    }
    return () => {
      newControlList.forEach((controlItem) => {
        if (controlItem.draw) {
          controlItem.draw.destroy();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, JSON.stringify(config), JSON.stringify(drawStyle), multiple, autoFocus, multiple, addMultiple]);

  /**
   * 外部data更新时，实时更新realData
   */
  useEffect(() => {
    setRealData(data);
  }, [data]);

  /**
   * 监听data发生变化，并实时更新数据
   */
  useDebounceEffect(
    () => {
      if (controlList.length) {
        controlList.forEach((controlItem) => {
          const { draw, type } = controlItem;
          const newData = data[type];
          if (Array.isArray(newData) && draw && draw.getData() !== newData) {
            draw.setData(newData);
          }
        });
      }
    },
    [data, controlList],
    {
      wait: 0,
    },
  );

  const { run: emitChange } = useDebounceFn(
    () => {
      onChange?.(realData);
    },
    {
      wait: 0,
    },
  );

  /**
   * 监听各个Draw的change事件，并将变更数据收集后异步调用onChange方法
   */
  useEffect(() => {
    const onChangeMap: Record<string, (newDrawData: any[]) => void> = {};
    for (const controlItem of controlList) {
      const { type, draw } = controlItem;
      if (!draw) {
        continue;
      }
      const onDrawChange = (newDrawData: any[]) => {
        setRealData((oldData) => {
          return {
            ...oldData,
            [type]: newDrawData,
          };
        });
        emitChange();
      };
      draw.on(DrawEvent.change, onDrawChange);
      onChangeMap[type] = onDrawChange;
    }
    return () => {
      for (const controlItem of controlList) {
        const { draw, type } = controlItem;
        const onDrawChange = onChangeMap[type];
        if (draw && onDrawChange) {
          controlItem.draw.off(DrawEvent.change, onDrawChange);
        }
      }
    };
  }, [controlList, emitChange]);

  /**
   * 清空的回调
   */
  const onClear = useCallback(() => {
    for (const controlItem of controlList) {
      const { draw } = controlItem;
      if (draw?.getData().length) {
        draw.clear();
      }
    }
  }, [controlList]);

  /**
   * control按钮点击的回调
   */
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

  return (
    <CustomControl name="drawControl" position={position}>
      <div
        className={classNames({
          'l7-bar': true,
          [`${CLS_PREFIX}_container`]: true,
          [`${CLS_PREFIX}_container__vertical`]: vertical,
          [className]: true,
        })}
        style={style}
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
    point: true,
    line: true,
    polygon: true,
    rect: true,
    circle: true,
    clear: true,
  },
  vertical: false,
};

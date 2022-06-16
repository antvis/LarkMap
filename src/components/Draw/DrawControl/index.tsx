import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomControl } from '../../CustomControl';
import { useScene } from '../../LarkMap/hooks';
import { CLS_PREFIX, DEFAULT_DRAW_CONFIG, DRAW_MAP, DRAW_TYPES } from './constant';
import './iconfont.js';
import './index.less';
import type { DrawControlProps, DrawItem, DrawType } from './types';

export type { DrawControlProps };

export const DrawControl: React.FC<DrawControlProps> = ({ position, config, vertical }) => {
  const scene = useScene();
  // Draw信息列表
  const [drawList, setDrawList] = useState<DrawItem[]>([]);

  // 当前激活的下标
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (scene) {
      const newDrawList: DrawItem[] = [];
      Object.entries(config).forEach(([drawType, drawConfig]) => {
        const Draw = DRAW_MAP[drawType];
        const defaultDrawConfig = DEFAULT_DRAW_CONFIG[drawType];
        if (DRAW_TYPES.includes(drawType as DrawType) && Draw) {
          const draw = new Draw(scene, {
            ...defaultDrawConfig.options,
            ...(drawConfig || {}),
          });
          newDrawList.push({
            draw,
            type: drawType,
            icon: (drawConfig || {}).icon ?? defaultDrawConfig.icon,
          });
        } else {
          newDrawList.push({
            type: drawType,
            icon: (drawConfig || {}).icon ?? defaultDrawConfig.icon,
          });
        }
      });
      setDrawList(newDrawList);
    }
  }, [scene, config]);

  const onDrawClick = useCallback(
    (item: DrawItem, index: number) => {
      if (activeIndex > -1 && activeIndex !== index) {
        drawList[activeIndex].draw?.disable();
      }
      const currentDraw = drawList[index].draw;
      if (currentDraw?.getIsEnable()) {
        currentDraw?.disable();
        setActiveIndex(-1);
      } else {
        currentDraw?.enable();
        setActiveIndex(index);
      }
    },
    [activeIndex, drawList],
  );

  const onClear = useCallback(() => {
    drawList.forEach((drawItem) => {
      drawItem.draw?.clear();
    });
  }, [drawList]);

  return (
    <CustomControl name="drawControl" position={position}>
      <div
        className={classNames({
          'l7-bar': true,
          [`${CLS_PREFIX}_container`]: true,
          [`${CLS_PREFIX}_container__vertical`]: vertical,
        })}
      >
        {drawList.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              className={classNames({
                [`${CLS_PREFIX}_btn`]: true,
                [`${CLS_PREFIX}_btn__active`]: isActive,
              })}
              onClick={() => {
                const drawItem = drawList[index];
                if (drawItem.draw) {
                  onDrawClick(drawItem, index);
                } else if (drawItem.type === 'clear') {
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

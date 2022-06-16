import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { CustomControl } from '../../CustomControl';
import { useScene } from '../../LarkMap/hooks';
import { CLS_PREFIX } from './constant';
import './iconfont.js';
import './index.less';
import type { DrawControlProps, DrawItem } from './types';

export type { DrawControlProps };

export const DrawControl: React.FC<DrawControlProps> = ({ position, config, vertical }) => {
  const scene = useScene();
  // Draw信息列表
  const [drawList, setDrawList] = useState<DrawItem[]>([]);

  // 当前激活的下标
  const [activeIndex, setActiveIndex] = useState(-1);

  const hasRemove = useMemo(() => config.clear, [config.clear]);

  return (
    <CustomControl name="drawControl" position={position}>
      <div
        className={classNames({
          'l7-bar': true,
          [`${CLS_PREFIX}_container`]: true,
          [`${CLS_PREFIX}_container__vertical`]: vertical,
        })}
      >
        {/*{drawItems.map((item, index) => {*/}
        {/*  const isActive = index === activeIndex;*/}
        {/*  const Icon = item.icon;*/}
        {/*  return (*/}
        {/*    <button*/}
        {/*      className={classNames({*/}
        {/*        [`${CLS_PREFIX}_btn`]: true,*/}
        {/*        [`${CLS_PREFIX}_btn__active`]: isActive,*/}
        {/*      })}*/}
        {/*      key={item.type}*/}
        {/*      onClick={() => onDrawClick(drawList[index], index)}*/}
        {/*    >*/}
        {/*      <Icon isActive={isActive} />*/}
        {/*    </button>*/}
        {/*  );*/}
        {/*})}*/}
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

import { Marker } from '@antv/larkmap';
import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { useScene } from '../LarkMap/hooks/use-scene';
import { CLS_PREFIX } from './constant';
import './index.less';
import type { ContextMenuProps } from './types';
import { Item } from './item';

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const scene = useScene();
  const [initMenu, setInitMenu] = useState({
    visible: false,
    position: undefined,
  });

  const initMenuRender = useMemo(() => {
    // @ts-ignore
    const childs = React.Children.toArray(props?.children);

    return (
      <ul className={classNames(`${CLS_PREFIX}`, props?.className)} style={props?.style}>
        {childs?.map((item) => {
          // @ts-ignore
          const { props: itemProps } = item || {};
          if (itemProps && itemProps.text) {
            return <Item text={itemProps.text} onClick={itemProps.onClick} />;
          } else {
            return <>{item}</>;
          }
        })}
      </ul>
    );
  }, [props]);

  // 右键打开面板信息
  const mapRightMenuOpen = (e) => {
    const { lng, lat } = e.lnglat;
    setInitMenu({
      visible: true,
      position: { lng, lat },
    });
  };

  // 单击事件关闭菜单
  const mapRightMenuClose = () => {
    const timeOut = setTimeout(() => {
      if (timeOut) {
        clearTimeout(timeOut);
        setInitMenu({
          visible: false,
          position: undefined,
        });
      }
    }, 0);
  };

  useEffect(() => {
    if (scene) {
      scene.on('contextmenu', mapRightMenuOpen);
      scene.on('click', mapRightMenuClose);
    }
    return () => {
      scene.off('contextmenu', mapRightMenuOpen);
      scene.off('click', mapRightMenuClose);
    };
  }, [scene]);

  return initMenu.visible ? (
    <Marker lngLat={initMenu.position} anchor="top-left">
      {initMenuRender}
    </Marker>
  ) : null;
};

export { ContextMenu };

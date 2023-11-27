import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useScene } from '../LarkMap/hooks/use-scene';
import { Marker } from '../Marker';
import { CLS_PREFIX } from './constant';
import { ContextMenuItem } from './ContextMenuItem';
import './index.less';
import type { ContextMenuProps } from './types';

export interface ContextMenuPropsType extends React.FC<ContextMenuProps> {
  Item: typeof ContextMenuItem;
}

const ContextMenu: ContextMenuPropsType = (props) => {
  const scene = useScene();
  const [initMenu, setInitMenu] = useState({
    visible: false,
    position: undefined,
  });

  const initMenuRender = useMemo(() => {
    return (
      <div className={classNames(`${CLS_PREFIX}`, props?.className)} style={props?.style}>
        {props?.children}
      </div>
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

ContextMenu.Item = ContextMenuItem;

export { ContextMenu };

import { Marker } from '@antv/l7';
import type React from 'react';
import { useMemo, useEffect } from 'react';
import { useScene } from '../LarkMap/hooks/use-scene';
import { CLS_PREFIX } from './constant';
import './index.less';

export const ContextMenu: React.FC = (props = {}) => {
  const scene = useScene();

  const initMenu = useMemo(() => {
    const { children } = props ?? {};
    const ulElement = document.createElement('ul');
    ulElement.className = `${CLS_PREFIX}`;
    children?.forEach((item: any, index) => {
      const { props: itemProps } = item;
      const el = document.createElement('li');
      el.innerHTML = itemProps?.text;
      el.addEventListener('click', itemProps?.onClick);
      ulElement.appendChild(el);
    });

    return ulElement;
  }, [props]);

  // 右键打开面板信息
  const mapRightClick = (e) => {
    const { lng, lat } = e.lnglat;
    const marker = new Marker({
      anchor: 'top-left',
      element: initMenu,
    }).setLnglat({ lng, lat });

    scene.addMarker(marker);
  };

  useEffect(() => {
    if (scene) {
      scene.on('contextmenu', mapRightClick);
    }
    return () => {
      if (scene) {
        scene.off('contextmenu', mapRightClick);
        scene.removeAllMakers();
      }
    };
  }, [scene]);

  return null;
};

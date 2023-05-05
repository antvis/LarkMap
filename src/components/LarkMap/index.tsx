import { Scene } from '@antv/l7';
import { useDeepCompareEffect } from 'ahooks';
import classNames from 'classnames';
import { isNull, isNumber, isUndefined } from 'lodash-es';
import type { CSSProperties } from 'react';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LayerManager } from '../../utils';
import { createMap } from './helper';
import { useSceneEvent } from './hooks/use-scene-event';
import type { LarkMapContextValue, LarkMapProps, LarkMapRefAttributes } from './types';

export const LarkMapContext = React.createContext<LarkMapContextValue>(null);

export const LarkMap = memo(
  forwardRef<LarkMapRefAttributes, LarkMapProps>(function LarkMap(props, ref) {
    const {
      id,
      style,
      className,
      map,
      mapType = 'Gaode',
      mapOptions = {},
      onLayerManagerCreated,
      onSceneLoaded,
      children,
      ...sceneConfig
    } = props;

    const containerRef = useRef();
    const [sceneInstance, setSceneInstance] = useState<Scene>(null);
    const { current: contextValue } = useRef<LarkMapContextValue>({
      scene: null,
      layerManager: null,
    });

    useEffect(() => {
      let scene: Scene;
      let isMounted = true;

      const callback = isUndefined(map) ? createMap(mapType, mapOptions) : typeof map === 'function' ? map() : map;
      Promise.resolve(callback)
        .then((mapInstance) => {
          if (!isMounted) {
            return;
          }
          scene = new Scene({
            ...sceneConfig,
            id: containerRef.current,
            map: mapInstance,
          });

          const layerManager = new LayerManager({ scene });

          contextValue.scene = scene;
          contextValue.layerManager = layerManager;

          scene.once('loaded', () => {
            if (onSceneLoaded) {
              onSceneLoaded(scene);
            }
            if (onLayerManagerCreated) {
              onLayerManagerCreated(layerManager);
            }
            setSceneInstance(scene);
          });
        })
        .catch((error) => {
          console.error(error);
        });

      return () => {
        isMounted = false;
        if (scene) {
          contextValue.scene = null;
          contextValue.layerManager = null;
          scene.destroy();
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useSceneEvent(sceneInstance, props);

    useImperativeHandle(
      ref,
      () => ({
        getScene: () => sceneInstance,
        getMap: () => sceneInstance.map,
      }),
      [sceneInstance],
    );

    // 更新地图样式
    useEffect(() => {
      if (sceneInstance && mapOptions.style) {
        sceneInstance.setMapStyle(mapOptions.style);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapOptions.style]);

    // 更新地图层级或地图视野中心点
    useDeepCompareEffect(() => {
      if (isNull(sceneInstance)) return;
      if (mapOptions.center && isNumber(mapOptions.zoom)) {
        sceneInstance.setZoomAndCenter(mapOptions.zoom, mapOptions.center);
      } else if (isNumber(mapOptions.zoom)) {
        sceneInstance.setZoom(mapOptions.zoom);
      } else if (mapOptions.center) {
        sceneInstance.setCenter(mapOptions.center);
      }
    }, [mapOptions.zoom, mapOptions.center]);

    // 更新地图视野倾角
    useEffect(() => {
      if (sceneInstance && isNumber(mapOptions.pitch)) {
        sceneInstance.setPitch(mapOptions.pitch);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapOptions.pitch]);

    // 更新地图旋转角度
    useEffect(() => {
      if (sceneInstance && isNumber(mapOptions.rotation)) {
        sceneInstance.setRotation(mapOptions.rotation);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapOptions.rotation]);

    const styles: CSSProperties = useMemo(
      () => ({
        position: 'relative',
        ...style,
      }),
      [style],
    );

    return (
      <div id={id} ref={containerRef} style={styles} className={classNames('larkmap', className)}>
        {sceneInstance && <LarkMapContext.Provider value={contextValue}>{children}</LarkMapContext.Provider>}
      </div>
    );
  }),
);

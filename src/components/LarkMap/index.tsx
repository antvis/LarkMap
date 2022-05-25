import { Scene } from '@antv/l7';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { LayerManager } from '../../utils';
import { createMap } from './helper';
import type { LarkMapContextValue, LarkMapProps, LarkMapRefAttributes } from './types';

export type { LarkMapProps };

export const LarkMapContext = React.createContext<LarkMapContextValue>(null);

export const LarkMap = forwardRef<LarkMapRefAttributes, LarkMapProps>((props, ref) => {
  const { id, style, className, map, mapType, mapOptions, onSceneLoaded, children, ...sceneConfig } = props;

  const containerRef = useRef();
  const [sceneInstance, setSceneInstance] = useState<Scene>(null);
  const { current: contextValue } = useRef<LarkMapContextValue>({ scene: null, layerManager: null });

  useEffect(() => {
    let scene: Scene;
    let isMounted = true;

    Promise.resolve(map || createMap(mapType, mapOptions))
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
          setSceneInstance(scene);
          if (onSceneLoaded) {
            onSceneLoaded(scene);
          }
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
  }, []);

  useImperativeHandle(ref, () => ({ getScene: () => sceneInstance, getMap: () => sceneInstance.map }), [sceneInstance]);

  const styles: CSSProperties = useMemo(
    () => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      ...style,
    }),
    [style],
  );

  return (
    <div id={id} ref={containerRef} style={styles} className={classNames('larkmap', className)}>
      {sceneInstance && <LarkMapContext.Provider value={contextValue}>{children}</LarkMapContext.Provider>}
    </div>
  );
});

LarkMap.defaultProps = {
  mapType: 'Mapbox',
};

export default LarkMap;

import classNames from 'classnames';
import { debounce, intersection } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { urlStringify } from '../../utils';
import { useScene } from '../LarkMap/hooks';
import { CLS_PREFIX, GAO_DE_API_URL } from './constant';
import './index.less';
import type { AdministrativeLocationProps } from './types';

export const AdministrativeLocation: React.FC<AdministrativeLocationProps> = ({
  className,
  style,
  searchParams,
  transformBounds,
  onChange,
}) => {
  const scene = useScene();
  const [text, setText] = useState('-');

  useEffect(() => {
    const onMapChange = async () => {
      if (!scene) {
        return;
      }
      const getPointAddress = (lng: number, lat: number) => {
        return new Promise<string[]>((resolve, reject) => {
          fetch(
            urlStringify(GAO_DE_API_URL, {
              ...searchParams,
              location: `${lng},${lat}`,
            }),
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status === '1') {
                const { country, province, city, district, township } = data.regeocode.addressComponent;
                resolve(
                  [country, province, city, district, township].filter((item) => typeof item === 'string' && item),
                );
              } else {
                reject(data);
              }
            });
        });
      };
      let [point1, point2] = scene.getBounds();
      if (transformBounds) {
        [point1, point2] = transformBounds([point1, point2]);
      }
      const [address1, address2] = await Promise.all([getPointAddress(...point1), getPointAddress(...point2)]);
      const newText = address1.length && address2.length ? intersection(address1, address2).join(' ') : '-';
      setText(newText);
      onChange?.(newText, [point1, point2]);
    };

    const onDebounceMapChange = debounce(onMapChange, 500, {
      maxWait: 500,
    });

    onMapChange();
    scene?.on('mapchange', onDebounceMapChange);
    return () => {
      scene?.off('mapchange', onDebounceMapChange);
    };
  }, [onChange, scene, searchParams, transformBounds]);

  return (
    <div className={classNames([className, CLS_PREFIX])} style={style}>
      {text}
    </div>
  );
};

import type { LineLayerProps } from '@antv/larkmap';
import { LineLayer, useScene } from '@antv/larkmap';
import type { Feature, MultiLineString } from '@turf/turf';
import { bbox, featureCollection, multiLineString } from '@turf/turf';
import type { CascaderProps } from 'antd';
import { Cascader, message } from 'antd';
import React, { useEffect, useState } from 'react';

export interface AdministrativeSelectProps
  extends Omit<CascaderProps, 'options' | 'multiple'>,
    Partial<Pick<CascaderProps, 'value' | 'onChange'>> {
  /**
   * 是否平移
   */
  autoFit?: boolean;
  /**
   * 是否显示边界
   */
  enableBoundary?: boolean;
  /**
   * layer属性
   */
  boundaryLayer?: Omit<LineLayerProps, 'source'>;
}

/**
 * 将获取的行政区域雷彪转换为 Cascader 的 options
 * @param list
 * @returns
 */
const getCascadeData = (list: any[]) => {
  list.sort((a: { adcode: number }, b: { adcode: number }) => {
    return +a.adcode - +b.adcode;
  });
  if (list.length) {
    return list.map((item: any) => {
      const { name, districts, adcode } = item;
      return {
        adcode,
        value: adcode,
        label: name,
        children: getCascadeData(districts),
      };
    });
  } else {
    return [];
  }
};

const defaultCascaderProps = {
  placeholder: '可选择省/市/县',
  expandTrigger: 'hover',
  allowClear: true,
  changeOnSelect: true,
  showSearch: true,
};

export const AdministrativeSelect: React.FC<AdministrativeSelectProps> = ({
  enableBoundary = true,
  autoFit = true,
  boundaryLayer = {
    shape: 'line',
    color: '#ff0000',
    size: 2,
    style: {
      opacity: 0.8,
    },
  },
  value: originValue,
  onChange,
  ...props
}) => {
  const [districtFeature, setDistrictFeature] = useState<Feature<MultiLineString> | null>(null);
  const scene = useScene();
  const [options, setOptions] = useState();
  const [value, setValue] = useState<AdministrativeSelectProps['value']>(originValue);

  useEffect(() => {
    setValue(originValue);
  }, [originValue]);

  useEffect(() => {
    fetch(
      'https://restapi.amap.com/v3/config/district?key=98d10f05a2da96697313a2ce35ebf1a2&keywords=中华人民共和国&subdistrict=3&extensions=base',
    )
      .then((res) => res.json())
      .then((res) => {
        setOptions(getCascadeData(res.districts[0].districts));
      });
  }, []);

  // 当选项发生改变时，更新围栏数据
  useEffect(() => {
    if (value) {
      const name = value[value.length - 1];
      fetch(
        `https://restapi.amap.com/v3/config/district?keywords=${name}&subdistrict=0&key=98d10f05a2da96697313a2ce35ebf1a2&extensions=all`,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === '1' && res.districts?.length && scene) {
            const positions: number[][][] = [];
            res.districts.forEach((district: any) => {
              (district.polyline as string).split('|').forEach((chunk) => {
                positions.push(chunk.split(';').map((item) => item.split(',').map((num) => +num)));
              });
            });

            const feature = multiLineString(positions);
            setDistrictFeature(feature);
            if (autoFit) {
              const [lng1, lat1, lng2, lat2] = bbox(feature);
              scene.fitBounds([
                [lng1, lat1],
                [lng2, lat2],
              ]);
            }
          }
        })
        .catch(() => {
          message.error('围栏数据请求失败');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Cascader
        options={options}
        value={value}
        onChange={(newValue: string[], option: any) => {
          setValue(newValue);
          // @ts-ignore
          onChange?.(newValue, option);
          if (!value) {
            setDistrictFeature(null);
          }
        }}
        multiple={false}
        {...defaultCascaderProps}
        {...props}
      />
      {enableBoundary && (
        <LineLayer
          source={{
            data: featureCollection(districtFeature ? [districtFeature] : []),
          }}
          {...boundaryLayer}
        />
      )}
    </>
  );
};

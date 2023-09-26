import type { LineLayerProps } from '@antv/larkmap';
import { CustomControl, LineLayer, useScene } from '@antv/larkmap';
import type { Feature, MultiLineString } from '@turf/turf';
import { featureCollection, multiLineString } from '@turf/turf';
import { Cascader, message } from 'antd';
import React, { useEffect, useState } from 'react';
import type { AdministrativeSelectProps } from './type';

const defaultLayerOptions: Omit<LineLayerProps, 'source'> = {
  shape: 'line',
  color: '#ff0000',
  size: 2,
  style: {
    opacity: 0.8,
  },
};

export const AdministrativeSelect: React.FC<AdministrativeSelectProps> = ({
  placeholder,
  expandTrigger,
  allowClear,
  changeOnSelect,
  style,
  enableBoundary,
  autoFit,
  boundaryLayer,
  value,
  multiple,
  onChange,
  ...props
}) => {
  const [districtFeature, setDistrictFeature] = useState<Feature<MultiLineString> | null>(null);
  const scene = useScene();
  const [options, setOptions] = useState();

  const getCascadeData = (list: any) => {
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

  useEffect(() => {
    fetch(
      'https://restapi.amap.com/v3/config/district?key=98d10f05a2da96697313a2ce35ebf1a2&keywords=中华人民共和国&subdistrict=3&extensions=base',
    )
      .then((res) => res.json())
      .then((res) => {
        setOptions(getCascadeData(res.districts[0].districts));
      });
  }, []);

  useEffect(() => {
    if (value) {
      const name = value[value.length - 1];
      fetch(
        `https://restapi.amap.com/v3/config/district?keywords=${name}&subdistrict=0&key=98d10f05a2da96697313a2ce35ebf1a2&extensions=all`,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === '1' && res.districts?.length && scene) {
            const [lng, lat] = (res.districts[0].center as string).split(',').map((item) => +item);
            if (autoFit) {
              scene.setZoomAndCenter(9, [lng, lat]);
            }
            const positions: number[][][] = [];

            res.districts.forEach((district: any) => {
              (district.polyline as string).split('|').forEach((chunk) => {
                positions.push(chunk.split(';').map((item) => item.split(',').map((num) => +num)));
              });
            });
            setDistrictFeature(multiLineString(positions));
          }
        })
        .catch(() => {
          message.error('围栏数据请求失败');
        });
    }
  }, [value]);
  return (
    <>
      <CustomControl position="lefttop">
        <Cascader
          options={options}
          value={value}
          onChange={(e: any, option: any) => {
            onChange?.(e, option);
            if (!value) {
              setDistrictFeature(null);
            }
          }}
          allowClear={allowClear}
          placeholder={placeholder}
          changeOnSelect={changeOnSelect}
          expandTrigger={expandTrigger}
          multiple={multiple}
          {...props}
        />
      </CustomControl>
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

AdministrativeSelect.defaultProps = {
  placeholder: '可选择省/市/县',
  expandTrigger: 'hover',
  allowClear: true,
  changeOnSelect: true,
  enableBoundary: true,
  autoFit: true,
  boundaryLayer: defaultLayerOptions,
  multiple: false,
};

import { Select, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import qs from 'query-string';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import { CustomControl } from '../CustomControl';
import type { LocationSearchProps, LocationSearchOption } from './types';
import { CLS_PREFIX } from './constant';
import './index.less';

const { Option } = Select;

export const LocationSearch: React.FC<LocationSearchProps> = ({
  gaodeParams,
  showAddress,
  onOptionsChange,
  onChange,
  position,
  className,
  style,
  ...selectProps
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<LocationSearchOption[]>([]);

  useEffect(() => {
    onOptionsChange?.(options);
  }, [onOptionsChange, options]);

  const { run: onSearch } = useDebounceFn(
    async (searchText: string) => {
      if (!searchText) {
        setOptions([]);
        return;
      }
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: 'https://restapi.amap.com/v3/place/text',
        query: {
          ...gaodeParams,
          keywords: [...(gaodeParams.keywords ?? '').split('|'), searchText].filter((item) => !!item).join('|'),
        },
      });
      const res = await (await fetch(url)).json().finally(() => {
        setIsLoading(false);
      });
      setOptions(
        (res?.pois ?? []).map((item) => {
          const [lon, lat] = item.location.split(',');
          item.longitude = +lon;
          item.latitude = +lat;
          return item;
        }),
      );
    },
    {
      wait: 1000,
    },
  );

  const onLocationChange = useCallback(
    (id?: string) => {
      const targetOption = id && options.find((option) => option.id === id);
      onChange?.(id, targetOption);
    },
    [onChange, options],
  );

  return (
    <CustomControl
      name="LocationSearch"
      position={position}
      className={classNames([className, CLS_PREFIX])}
      style={style}
    >
      <Select
        className={`${CLS_PREFIX}_select`}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        onSearch={onSearch}
        onChange={onLocationChange}
        {...selectProps}
      >
        {options.map((option) => {
          return (
            <Option key={option.id} value={option.id}>
              <div title={option.name} className={`${CLS_PREFIX}_option-name`}>
                {option.name}
              </div>
              {showAddress && (
                <div title={option.address} className={`${CLS_PREFIX}_option-address`}>
                  {option.address}
                </div>
              )}
            </Option>
          );
        })}
      </Select>
    </CustomControl>
  );
};

LocationSearch.defaultProps = {
  placeholder: '请输入要搜索地名',
  showSearch: true,
  allowClear: true,
  suffixIcon: <SearchOutlined />,
  filterOption: false,
  defaultActiveFirstOption: false,
  showAddress: true,
  position: 'topleft',
};

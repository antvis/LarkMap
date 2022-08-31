import { Select, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import qs from 'query-string';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import type { LocationSearchProps, LocationSearchOption } from './types';
import { CLS_PREFIX, GAO_DE_API_URL } from './constant';
import './index.less';

const { Option } = Select;

export const LocationSearch: React.FC<LocationSearchProps> = ({
  searchParams,
  showAddress,
  onSearchFinish,
  onChange,
  ...selectProps
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<LocationSearchOption[]>([]);

  useEffect(() => {
    onSearchFinish?.(options);
  }, [onSearchFinish, options]);

  const { run: onSearch } = useDebounceFn(
    async (searchText: string) => {
      if (!searchText) {
        setOptions([]);
        return;
      }
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: GAO_DE_API_URL,
        query: {
          ...searchParams,
          keywords: [...(searchParams.keywords ?? '').split('|'), searchText].filter((item) => !!item).join('|'),
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
    (name?: string) => {
      const targetOption = name && options.find((option) => option.name === name);
      onChange?.(name, targetOption);
    },
    [onChange, options],
  );

  return (
    <Select
      className={`${CLS_PREFIX}`}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      onSearch={onSearch}
      onChange={onLocationChange}
      {...selectProps}
    >
      {options.map((option) => {
        return (
          <Option key={option.id} value={option.name}>
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
};

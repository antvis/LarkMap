import { useDebounceFn } from 'ahooks';
import md5 from 'md5';
import React, { useCallback, useEffect, useState } from 'react';
import { getQueryString } from '../../utils';
import { CLS_PREFIX, GAO_DE_API_URL } from './constant';
import './index.less';
import Select from './Select';
import type { LocationSearchOption, LocationSearchProps } from './types';

const { Option } = Select;

const defaultSelectProps = {
  placeholder: '请输入要搜索地名',
  showSearch: true,
  allowClear: true,
  filterOption: false,
  defaultActiveFirstOption: false,
};


export const LocationSearch: React.FC<LocationSearchProps> = ({
  searchParams,
  showDistrict = true,
  showAddress = true,
  onSearchFinish,
  onChange,
  ...selectProps
}) => {
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
      const { keywords, privateKey, ...otherParams } = searchParams;
      const params = {
        ...otherParams,
        keywords: [...(keywords ?? '').split('|'), searchText].filter((item) => !!item).join('|'),
      };
      if (privateKey) {
        params.sig = md5(getQueryString(params, false) + privateKey);
      }
      const url = `${GAO_DE_API_URL}?${getQueryString(params, true)}`;
      const res = await (await fetch(url)).json();
      setOptions(
        (res?.tips ?? [])
          .filter((item) => item.location && item.location.length)
          .map((item) => {
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
      onChange?.(name || undefined, targetOption || undefined);
    },
    [onChange, options],
  );

  return (
    <Select
      className={`${CLS_PREFIX}`}
      onSearch={onSearch}
      onChange={onLocationChange}
      clearIcon={() => null}
      {...defaultSelectProps}
      {...selectProps}
    >
      {options.map((option) => {
        const tip = `${showDistrict ? option.district : ''}${showAddress ? option.address : ''}`;
        return (
          <Option key={option.id} value={option.name}>
            <div title={option.name} className={`${CLS_PREFIX}__option-name`}>
              {option.name}
            </div>
            {tip && (
              <div title={tip} className={`${CLS_PREFIX}__option-tip`}>
                {tip}
              </div>
            )}
          </Option>
        );
      })}
    </Select>
  );
};

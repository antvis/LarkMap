import { Select, Spin } from 'antd';
import React, { useState } from 'react';
import qs from 'query-string';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { CustomControl } from '../CustomControl';
import type { LocationSearchProps, LocationSearchOption } from './types';
import { CLS_PREFIX } from './constant';
import './index.less';

const { Option } = Select;

export const LocationSearch: React.FC<LocationSearchProps> = ({
  position,
  className,
  style,
  gaodeParams,
  ...selectProps
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<LocationSearchOption[]>([]);

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
          keywords: `${searchText}${gaodeParams.keywords ? `|${gaodeParams.keywords}` : ''}`,
        },
      });
      const res = await (await fetch(url)).json().finally(() => {
        setIsLoading(false);
      });
      setOptions(res?.pois ?? []);
    },
    {
      wait: 1000,
    },
  );

  return (
    <CustomControl name="LocationSearch" position={position} className={className} style={style}>
      <Select
        className={`${CLS_PREFIX}_select`}
        onSearch={onSearch}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        {...selectProps}
      >
        {options.map((option) => {
          return (
            <Option key={option.id} value={option.id}>
              <div title={option.name} className={`${CLS_PREFIX}_option-name`}>
                {option.name}
              </div>
              <div title={option.address} className={`${CLS_PREFIX}_option-address`}>
                {option.address}
              </div>
            </Option>
          );
        })}
      </Select>
    </CustomControl>
  );
};

LocationSearch.defaultProps = {
  placeholder: '请输入要搜索的位置',
  showSearch: true,
  allowClear: true,
  suffixIcon: <SearchOutlined />,
  filterOption: false,
  defaultActiveFirstOption: false,
};

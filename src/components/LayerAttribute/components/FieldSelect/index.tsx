import type { SelectProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import React from 'react';
import AntdSelect from './AntdSelect';

const FieldSelect: ReactFC<SelectProps<any, any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          // @ts-ignore
          field?.loading || field?.validating ? <LoadingOutlined /> : props.suffixIcon,
      };
    },
  ),
);

export default FieldSelect;

import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import AntdColorType from './AntdColorType';

const ColorType: ReactFC<SelectProps> = connect(AntdColorType);

export default ColorType;

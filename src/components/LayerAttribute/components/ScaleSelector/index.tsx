import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import AntdScaleSelector from './AntdScaleSelector';

const ScaleSelector: ReactFC<SelectProps> = connect(AntdScaleSelector);

export default ScaleSelector;

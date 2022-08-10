import type { SelectProps } from 'antd';
import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import AntdRibbonSelect from './AntdRibbonSelect';

const RibbonSelect: ReactFC<SelectProps<any, any>> = connect(AntdRibbonSelect);

export default RibbonSelect;

import type { SelectProps } from 'antd';
import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import AntRibbonSelect from './AntRibbonSelect';

const RibbonSelect: ReactFC<SelectProps<any, any>> = connect(AntRibbonSelect);

export default RibbonSelect;

import type { SelectProps } from 'antd';
import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import ColorRibbon from './ColorRibbon';

const RibbonSelect: ReactFC<SelectProps<any, any>> = connect(ColorRibbon);

export default RibbonSelect;

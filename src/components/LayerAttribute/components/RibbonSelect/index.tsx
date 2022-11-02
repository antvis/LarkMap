import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { AntdRibbonSelectProps } from './AntdRibbonSelect';
import AntdRibbonSelect from './AntdRibbonSelect';

const RibbonSelect: ReactFC<AntdRibbonSelectProps> = connect(
  AntdRibbonSelect,
  mapProps({
    dataSource: 'options',
    loading: true,
  }),
);

export default RibbonSelect;

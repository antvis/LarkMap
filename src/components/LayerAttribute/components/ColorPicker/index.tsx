import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { AntdColorPickerProps } from './AntdColorPicker';
import AntdColorPicker from './AntdColorPicker';

export const Color: ReactFC<AntdColorPickerProps> = connect(AntdColorPicker);

export default Color;

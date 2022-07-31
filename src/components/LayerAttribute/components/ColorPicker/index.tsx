import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { AntdColorPickerProps } from './AntColorPicker';
import { AntColorPicker } from './AntColorPicker';

export const Color: ReactFC<AntdColorPickerProps> = connect(AntColorPicker);

export default Color;

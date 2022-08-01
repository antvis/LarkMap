import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { AntdColorPickerProps } from './AntdColorPicker';
import AntdColorPicker from './AntdColorPicker';

const ColorPicker: ReactFC<AntdColorPickerProps> = connect(AntdColorPicker);

export default ColorPicker;

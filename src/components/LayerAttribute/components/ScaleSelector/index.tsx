import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import type { AntdScaleSelectorProps } from './AntdScaleSelector';
import AntdScaleSelector from './AntdScaleSelector';

const ScaleSelector: ReactFC<AntdScaleSelectorProps> = connect(AntdScaleSelector);

export default ScaleSelector;

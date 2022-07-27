import type { ReactFC } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import AntdSlider from './AntdSlider';

const SliderRange: ReactFC<any> = connect(
  AntdSlider,
  mapProps(
    {
      value: true,
      loading: true,
    },
    (props) => {
      return {
        ...props,
      };
    },
  ),
  mapReadPretty(AntdSlider),
);

export default SliderRange;

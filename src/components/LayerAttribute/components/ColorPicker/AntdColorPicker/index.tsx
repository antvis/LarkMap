import React, { useCallback } from 'react';
import { Button, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import './index.less';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';

export interface AntdColorPickerProps {
  value?: string;
  disable?: boolean;
  onChange?: (color: string) => void;
}

const presetColors = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
  '#A9ABB1',
];

export const AntdColorPicker = React.memo((props: AntdColorPickerProps) => {
  const { onChange, value, disable = false } = props;
  const prefixCls = usePrefixCls('formily-color-picker');

  const onChangeComplete = useCallback(
    (color) => {
      onChange?.(color.hex);
    },
    [onChange],
  );

  return (
    <Button className={prefixCls} type="text" disabled={disable}>
      <Popover
        trigger="click"
        placement="left"
        content={
          <SketchPicker
            color={value ? value : presetColors[0]}
            disableAlpha
            onChange={onChangeComplete}
            presetColors={presetColors}
          />
        }
      >
        <div>
          <div style={{ background: value ? value : presetColors[0] }} />
        </div>
      </Popover>
    </Button>
  );
});

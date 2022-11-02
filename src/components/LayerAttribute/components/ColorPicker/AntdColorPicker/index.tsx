import React, { useCallback } from 'react';
import { Popover } from 'antd';
import { SketchPicker } from 'react-color';
import { usePrefixCls } from '@formily/antd/esm/__builtins__/hooks/usePrefixCls';
import './index.less';

export interface AntdColorPickerProps {
  value?: string;
  disable?: boolean;
  onChange?: (color: string) => void;
}

const Preset_Colors = [
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

const AntdColorPicker = React.memo((props: AntdColorPickerProps) => {
  const { onChange, value, disable = false } = props;
  const prefixCls = usePrefixCls('formily-color-picker');

  const onChangeComplete = useCallback(
    (color) => {
      onChange?.(color.hex);
    },
    [onChange],
  );

  return (
    <div className={prefixCls} style={{ pointerEvents: disable ? 'none' : 'auto' }}>
      <Popover
        trigger="click"
        placement="bottom"
        overlayClassName={`${prefixCls}__popover`}
        content={
          <SketchPicker
            color={value ? value : Preset_Colors[0]}
            disableAlpha
            onChange={onChangeComplete}
            presetColors={Preset_Colors}
          />
        }
      >
        <div className={`${prefixCls}__color-block`} style={{ background: value ? value : Preset_Colors[0] }} />
      </Popover>
    </div>
  );
});

export default AntdColorPicker;

import React, { useEffect, useState } from 'react';
// import { ColorPicker } from '';

export type AntdColorPickerProps = {
  value: string | string[];
  onChange: (value: string | string[]) => void;
};

const AntdColorPicker = (props: AntdColorPickerProps) => {
  const [color, setColor] = useState<string>('#F7664E');
  useEffect(() => {
    setColor(props.value as string);
  }, [props.value]);

  return (
    <div
      style={{
        width: '28px',
        borderRadius: '4px',
        padding: '2px',
        border: '1px solid #d9d9d9',
        background: '#fff',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      {/* <ColorPicker
        defaultValue="#F7664E"
        type="sketch"
        defaultVisible={false}
        onChange={(value: string | string[]) => {
          props.onChange(value);
          setColor(value as string);
        }}
        trigger={
          <div
            style={{
              backgroundColor: color,
              height: '100%',
              width: '100%',
            }}
          />
        }
      /> */}
    </div>
  );
};

export default AntdColorPicker;

import { DrawModal } from '@antv/larkmap';
import { Button, Input, message } from 'antd';
import 'antd/dist/antd.less';
import React, { useState } from 'react';

const { TextArea } = Input;

export default () => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        绘制
      </Button>

      <TextArea value={text} rows={10} placeholder="请点击上方绘制按钮进行绘制" disabled style={{ marginTop: 16 }} />

      <DrawModal
        visible={visible}
        drawControl={{
          config: {
            polygon: true,
            clear: true,
          },
          multiple: false,
          defaultActiveType: 'polygon',
        }}
        onSubmit={(data) => {
          if (!data?.polygon?.length) {
            message.warn('请进行绘制');
            return;
          }
          setText(JSON.stringify(data.polygon[0], null, 2));
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};
